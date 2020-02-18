import React, {Component, Fragment} from 'react';
import styled from 'styled-components';
import {installmentPayment, chargeInstallmentContract} from '../../services/TransactionService';

const Selector = styled.div`
  text-align: center;
  display: block;
  margin: 10px 0;
  @media (min-width: 1440px) {
    height: fit-content;
    margin: auto 0px;
  }
  select {
    width: 80%;
  }
  .installment_btn {
    height: 45px;
    width: 192px;
    border: 0;
    border-radius: 1em;
    font-size: large;
    background-color: #00ffff;
    color: #000000;
    cursor: pointer;
  }
`;

class InstallmentOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      installmentOption: 'InstallmentPayment',
    };
  }

  async componentDidMount() {
    // To Do !
  }

  inputInstallmentOption(event) {
    this.setState({
      installmentOption: event.target.value
    })
  }

  async performInstallmentOption(event) {
    const {deployedHouse, houseInfo} = this.props;
    if (this.state.installmentOption === 'InstallmentPayment') {
      await installmentPayment(deployedHouse, houseInfo.installmentPaymentCharge);
    } else if (this.state.installmentOption === 'Charge') {
      await chargeInstallmentContract(deployedHouse, houseInfo.installmentPaymentCharge);
    }
  }

  render() {
    const {installmentOption} = this.state;
    const {houseInfo} = this.props;
    return (
      <Selector>
        {!houseInfo.inProcess || web3.eth.defaultAccount === houseInfo.installmentBuyer
          ?
          <Fragment>
            <label htmlFor="InstallmentPaymentOption">Installment Payment Options:</label>
            <select name="installmentPaymentOption" value={installmentOption}
                    onChange={this.inputInstallmentOption.bind(this)}>
              <option value="InstallmentPayment">Initialize Installment Process</option>
              <option value="Charge">Installment Monthly Payment</option>
            </select>
            <div className="btn">
              <button className="installment_btn" onClick={this.performInstallmentOption.bind(this)}>
                {installmentOption}
              </button>
            </div>
          </Fragment>
          :
          <Fragment>
            <label htmlFor="InstallmentOption">Installment Payment Options:</label>
            <div className="btn">
              <button className="installment_btn">
                House Has Been Partially Paid !
              </button>
            </div>
          </Fragment>
        }
      </Selector>
    );
  }
}

export default InstallmentOption;
