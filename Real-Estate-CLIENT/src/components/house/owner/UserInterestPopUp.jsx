import React, {Component} from 'react';
import Popup from 'reactjs-popup';
import InstallmentPopUp from './InstallmentPopUp';
import CheckIcon from '../../../../assets/check-mark.png';
import RejectIcon from '../../../../assets/reject-mark.png';
import {FormStyle} from '../../utils/PopUpForm';
import {toBigNumber, toSecond} from '../../../services/Utils';
import {getListUserTransaction, getListUserInfo, getInterestUsers} from '../../../services/MongoService';

class UserInterestPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersInfo: [],
      interestRate: 10,
      installmentPaymentStep: 1,
      installmentDuration: 3,
      timeUnit: 'Month',
      usersTransactions: []
    };
  }

  componentDidMount() {
    getInterestUsers({...this.props}).then(interestUsers => {
      return Promise.all([getListUserTransaction(interestUsers), getListUserInfo(interestUsers)]);
    }).then(usersData => {
      this.setState({
        usersInfo: usersData[1]
      });
      return Promise.all(usersData[0].map(userTx => {
        return new Promise((resolve, reject) => {
          web3.eth.getBalance(userTx.userAddress, (error, balance) => {
            if (error) {
              reject(error);
            }
            resolve({...userTx, balance});
          });
        });
      }));
    }).then(usersTxs => {
      this.setState({
        usersTransactions: usersTxs
      });
    });
  }

  inputInterestRate(event) {
    this.setState({
      interestRate: event.target.value
    });
  }

  inputPaymentStep(event) {
    this.setState({
      installmentPaymentStep: event.target.value
    });
  }

  inputDuration(event) {
    this.setState({
      installmentDuration: event.target.value
    });
  }

  inputTimeUnit(event) {
    this.setState({
      timeUnit: event.target.value
    });
  }

  static generateKey(pre) {
    return `${pre}_${new Date().getTime()}`;
  }

  checkAffordable(userTxInfo) {
    if (!userTxInfo || !userTxInfo.balance || !userTxInfo.transactions) {
      return false;
    }
    const {houseInfo} = this.props;
    const {interestRate, installmentPaymentStep, installmentDuration, timeUnit} = this.state;
    /* Filtering all nearest transactions in range of payment duration !*/
    const filteredTx = userTxInfo.transactions.filter(tx => {
      return tx.timestamp >= new Date().getTime() / 1000 - toSecond(installmentDuration, timeUnit).toNumber();
    });
    // console.log('All filtered transactions', filteredTx);
    const totalIncomeInDuration = filteredTx.reduce((accumulator, tx) => {
      return accumulator.plus(tx.value);
    }, toBigNumber(0));
    try {
      const totalPayment = toBigNumber(houseInfo.price).mul(toBigNumber(interestRate).plus(100)).div(100);
      const installmentPaymentCharge = totalPayment.mul(installmentPaymentStep).div(installmentDuration);
      return installmentPaymentCharge.lessThanOrEqualTo(userTxInfo.balance) &&
        totalIncomeInDuration.plus(userTxInfo.balance).greaterThanOrEqualTo(totalPayment);
    } catch (Exception) {
      return false;
    }
  }

  render() {
    const {usersInfo, timeUnit, usersTransactions} = this.state;
    return (
      <Popup modal {...this.props}>
        <FormStyle>
          <div className="container">
            <div className="form">
              <div className="formInput">
                <label htmlFor="InterestRate">Interest Rate (%):</label>
                <input type="number" name="InterestRate" value={this.state.interestRate}
                       onChange={this.inputInterestRate.bind(this)}/>
              </div>
              <div className="formInput">
                <label htmlFor="PaymentStep">Pay After x ({timeUnit}):</label>
                <input type="number" name="PaymentStep" value={this.state.installmentPaymentStep}
                       onChange={this.inputPaymentStep.bind(this)}/>
              </div>
              <div className="formInput">
                <label htmlFor="Duration">Installment Duration ({timeUnit}):</label>
                <input type="number" name="Duration" value={this.state.installmentDuration}
                       onChange={this.inputDuration.bind(this)}/>
              </div>
              <div className="formInput">
                <label htmlFor="Type">Time Unit:</label>
                <select name="Type" value={this.state.timeUnit} onChange={this.inputTimeUnit.bind(this)}>
                  <option value="Day">Day</option>
                  <option value="Week">Week</option>
                  <option value="Month">Month</option>
                  <option value="Year">Year</option>
                </select>
              </div>
            </div>
            <br/>
            <table className="table" style={{width: '100%'}} border="1">
              <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Phone</th>
                <th scope="col">Email</th>
                <th scope="col">Affordable</th>
                <th scope="col">Sign Installment Contract !</th>
              </tr>
              </thead>
              <tbody id="productList">
              {usersInfo.map(({_id, userAddress, name, phone, email}, key) =>
                <tr key={UserInterestPopUp.generateKey(key)}>
                  <th scope="row">{name}</th>
                  <th scope="row">{phone}</th>
                  <th scope="row">{email}</th>
                  <td>{this.checkAffordable(usersTransactions.find(userTx => userTx.userAddress === userAddress)) ?
                    <img src={CheckIcon} style={{width: '3em', display: 'block', margin: 'auto'}}/>
                    :
                    <img src={RejectIcon} style={{width: '3em', display: 'block', margin: 'auto'}}/>
                  }
                  </td>
                  <td>
                    <InstallmentPopUp trigger={<button>{`Sign Contract !`}</button>} {...this.state}
                                      deployedHouse={this.props.deployedHouse} acceptAddress={userAddress}/>
                  </td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
        </FormStyle>
      </Popup>
    );
  }
}

export default UserInterestPopUp;
