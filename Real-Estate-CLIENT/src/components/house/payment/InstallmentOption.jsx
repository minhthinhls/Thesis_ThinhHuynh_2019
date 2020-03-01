import React, {Component, Fragment} from 'react';
import styled from 'styled-components';
import {installmentPayment, chargeInstallmentContract} from '../../../services/TransactionService';
import {ToastButton} from '../../utils/ToastNotification';
import SelectOption from '../stylesheet/SelectOption';
import {is} from '../../../services/Utils';

/* Override the background color <gray> of component button ! */
const Selector = styled(SelectOption)`
  && button {
    background-color: Aqua;
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
        {!houseInfo.inProcess || is(houseInfo.installmentBuyer)
          ?
          <Fragment>
            <label htmlFor="InstallmentPaymentOption">Installment Payment Options:</label>
            <select name="installmentPaymentOption" value={installmentOption}
                    onChange={this.inputInstallmentOption.bind(this)}>
              <option value="InstallmentPayment">Initialize Installment Process</option>
              <option value="Charge">Installment Monthly Payment</option>
            </select>
            <ToastButton onSuccess={`Successfully Charge Installment Contract !`}
                         onClick={this.performInstallmentOption.bind(this)}>
              {installmentOption}
            </ToastButton>
          </Fragment>
          :
          <Fragment>
            <label htmlFor="InstallmentOption">Installment Payment Options:</label>
            <button>
              House Has Been Partially Paid !
            </button>
          </Fragment>
        }
      </Selector>
    );
  }
}

export default InstallmentOption;
