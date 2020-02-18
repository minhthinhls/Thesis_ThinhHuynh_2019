import React, {Component} from 'react';
import {setInstallmentPayment} from '../../services/OwnerService';
import {toSecond} from '../../services/Utils';
import PopUpForm from './PopUpForm';

class InstallmentPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repayRate: 0,
      interestRate: 10,
      installmentPaymentStep: 1,
      installmentDuration: 3,
      installable: true,
      acceptAddress: '0x2b6FcDcb83b804d482FAf1D1444DF6C7b9f423AA',
      timeUnit: 'Month'
    };
  }

  async componentDidMount() {
    // To Do !
  }

  inputRepayRate(event) {
    this.setState({
      repayRate: event.target.value
    })
  }

  inputInterestRate(event) {
    this.setState({
      interestRate: event.target.value
    })
  }

  inputPaymentStep(event) {
    this.setState({
      installmentPaymentStep: event.target.value
    })
  }

  inputDuration(event) {
    this.setState({
      installmentDuration: event.target.value
    })
  }

  inputInstallable(event) {
    this.setState({
      installable: event.target.value
    })
  }

  inputTimeUnit(event) {
    this.setState({
      timeUnit: event.target.value
    })
  }

  inputAcceptAddress(event) {
    this.setState({
      acceptAddress: event.target.value
    })
  }

  async setInstallmentPayment(event) {
    const {deployedHouse} = this.props;
    await setInstallmentPayment(deployedHouse, {
      repayRate: this.state.interestRate,
      interestRate: this.state.interestRate,
      installmentPaymentStep: toSecond(this.state.installmentPaymentStep, this.state.timeUnit),
      installmentDuration: toSecond(this.state.installmentDuration, this.state.timeUnit),
      installable: Boolean(this.state.installable),
      acceptAddress: this.state.acceptAddress
    });
  }

  render() {
    const {timeUnit} = this.state;
    const {button} = this.props;
    return (
      <PopUpForm button={button}>
        <div className="formInput">
          <label htmlFor="RepayRate">Repay Rate (%):</label>
          <input type="number" name="RepayRate" value={this.state.repayRate}
                 onChange={this.inputRepayRate.bind(this)}/>
        </div>
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
          <label htmlFor="AcceptAddress">Accept Only Address:</label>
          <input type="text" name="AcceptAddress" value={this.state.acceptAddress}
                 onChange={this.inputAcceptAddress.bind(this)}/>
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
        <div className="formInput">
          <label htmlFor="Type">Allow Installment Paid:</label>
          <select name="Type" value={this.state.timeUnit} onChange={this.inputInstallable.bind(this)}>
            <option value="true">Yes</option>
            <option value="">No</option>
          </select>
        </div>
        <div className="btn formInput">
          <button onClick={this.setInstallmentPayment.bind(this)}>Update !</button>
        </div>
      </PopUpForm>
    );
  }
}

export default InstallmentPopUp;
