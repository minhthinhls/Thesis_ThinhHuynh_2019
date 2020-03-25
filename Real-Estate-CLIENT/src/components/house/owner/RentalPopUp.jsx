import React, {Component} from 'react';
import {setRentalPayment} from '../../../services/OwnerService';
import {ToastButton} from '../../utils/ToastNotification';
import {toSecond} from '../../../services/Utils';
import {PopUpForm} from '../../utils/PopUpForm';

class RentalPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rentalPaymentCharge: 1,
      rentalPaymentStep: 1,
      rentalDuration: 3,
      rentable: 'true',
      timeUnit: 'Month'
    };
  }

  async componentDidMount() {
    // To Do !
  }

  inputPaymentCharge(event) {
    this.setState({
      rentalPaymentCharge: event.target.value
    });
  }

  inputPaymentStep(event) {
    this.setState({
      rentalPaymentStep: event.target.value
    });
  }

  inputDuration(event) {
    this.setState({
      rentalDuration: event.target.value
    });
  }

  inputRentable(event) {
    this.setState({
      rentable: event.target.value
    });
  }

  inputTimeUnit(event) {
    this.setState({
      timeUnit: event.target.value
    });
  }

  async setRentalPayment(event) {
    await setRentalPayment(this.props.deployedHouse, {
      rentalPaymentCharge: web3.toWei(this.state.rentalPaymentCharge, 'ether'),
      rentalPaymentStep: toSecond(this.state.rentalPaymentStep, this.state.timeUnit),
      rentalDuration: toSecond(this.state.rentalDuration, this.state.timeUnit),
      rentable: JSON.parse(this.state.rentable)
    });
  }

  render() {
    const {timeUnit} = this.state;
    return (
      <PopUpForm trigger={this.props.trigger}>
        <div className="formInput">
          <label htmlFor="PaymentCharge">Annual Payment Fee (Ether):</label>
          <input type="number" name="PaymentCharge" value={this.state.rentalPaymentCharge}
                 onChange={this.inputPaymentCharge.bind(this)}/>
        </div>
        <div className="formInput">
          <label htmlFor="PaymentStep">Pay After x ({timeUnit}):</label>
          <input type="number" name="PaymentStep" value={this.state.rentalPaymentStep}
                 onChange={this.inputPaymentStep.bind(this)}/>
        </div>
        <div className="formInput">
          <label htmlFor="Duration">Rental Duration ({timeUnit}):</label>
          <input type="number" name="Duration" value={this.state.rentalDuration}
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
        <div className="formInput">
          <label htmlFor="Type">Allow Rent:</label>
          <select name="Type" defaultValue={this.state.rentable} onChange={this.inputRentable.bind(this)}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <ToastButton onSuccess={`Successfully Update Rental Payment !`}
                     onClick={this.setRentalPayment.bind(this)}>Update !
        </ToastButton>
      </PopUpForm>
    );
  }
}

export default RentalPopUp;
