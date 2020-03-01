import React, {Component} from 'react';
import styled from 'styled-components';
import {resetInstallmentContract} from '../../../services/OwnerService';
import {ToastButton} from '../../utils/ToastNotification';
import InstallmentPopUp from './InstallmentPopUp';
import SelectOption from '../stylesheet/SelectOption';

/* Override the background color <gray> of component button ! */
const Selector = styled(SelectOption)`
  && button {
    background-color: Aqua;
  }
`;

class OwnerInstallmentOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      installmentOption: 'Reset',
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
    if (this.state.installmentOption === 'Reset') {
      await resetInstallmentContract(this.props.deployedHouse);
    } else {
      throw Error("Event has not been defined yet !");
    }
  }

  render() {
    const {installmentOption} = this.state;
    return (
      <Selector>
        <label htmlFor="InstallmentPaymentOption">Owner Installment Options:</label>
        <select name="installmentPaymentOption" value={installmentOption}
                onChange={this.inputInstallmentOption.bind(this)}>
          <option value="Reset">Reset Installment Contract !</option>
          <option value="SetInstallmentDetail">Set Installment Payment !</option>
        </select>
        {installmentOption === 'Reset'
          ?
          <ToastButton onSuccess={`Successfully Reset Installment Contract !`}
                       onClick={this.performInstallmentOption.bind(this)}>
            {`Reset Contract !`}
          </ToastButton>
          :
          <InstallmentPopUp trigger={<button>{`Set Installment Detail`}</button>}
                            deployedHouse={this.props.deployedHouse}/>
        }
      </Selector>
    );
  }
}

export default OwnerInstallmentOption;
