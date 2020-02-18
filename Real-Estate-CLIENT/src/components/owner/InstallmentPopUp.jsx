import React, {Component} from 'react';
import {setInstallmentPayment} from '../../services/OwnerService';
import {toSecond} from '../../services/Utils';
import PopUpForm from './PopUpForm';

class InstallmentPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interestRate: null,
      installmentPaymentStep: null,
      installmentDuration: null,
      installable: null,
      timeUnit: 'Day'
    };
  }

  async componentDidMount() {
    // To Do !
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

  async setInstallmentPayment(event) {
    const {deployedHouse} = this.props;
    await setInstallmentPayment(deployedHouse, {
      interestRate: this.state.interestRate,
      installmentPaymentStep: toSecond(this.state.installmentPaymentStep, this.state.timeUnit),
      installmentDuration: toSecond(this.state.installmentDuration, this.state.timeUnit),
      installable: Boolean(this.state.installable)
    });
  }

  render() {
    const {timeUnit} = this.state;
    const {button} = this.props;
    return (
      <PopUpForm button={button}>
        <div className="formInput">
          <label htmlFor="InterestRate">Interest Rate (%):</label>
          <input type="number" name="InterestRate" onChange={this.inputInterestRate.bind(this)}/>
        </div>
        <div className="formInput">
          <label htmlFor="PaymentStep">Pay After x ({timeUnit}):</label>
          <input type="number" name="PaymentStep" onChange={this.inputPaymentStep.bind(this)}/>
        </div>
        <div className="formInput">
          <label htmlFor="Duration">Installment Duration ({timeUnit}):</label>
          <input type="number" name="Duration" onChange={this.inputDuration.bind(this)}/>
        </div>
        <div className="formInput">
          <label htmlFor="Type">Time Unit:</label>
          <select name="Type" onChange={this.inputTimeUnit.bind(this)}>
            <option value="Day">Day</option>
            <option value="Week">Week</option>
            <option value="Month">Month</option>
            <option value="Year">Year</option>
          </select>
        </div>
        <div className="formInput">
          <label htmlFor="Type">Allow Installment Paid:</label>
          <select name="Type" onChange={this.inputInstallable.bind(this)}>
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
