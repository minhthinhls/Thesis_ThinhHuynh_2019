import React, {Component} from 'react';
import {setRentalPayment} from '../../services/OwnerService';
import {toSecond} from '../../services/Utils';
import PopUpForm from './PopUpForm';

class RentalPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rentalPaymentCharge: null,
      rentalPaymentStep: null,
      rentalDuration: null,
      rentable: null,
      timeUnit: 'Day'
    };
  }

  async componentDidMount() {
    // To Do !
  }

  inputPaymentCharge(event) {
    this.setState({
      rentalPaymentCharge: event.target.value
    })
  }

  inputPaymentStep(event) {
    this.setState({
      rentalPaymentStep: event.target.value
    })
  }

  inputDuration(event) {
    this.setState({
      rentalDuration: event.target.value
    })
  }

  inputRentable(event) {
    this.setState({
      rentable: event.target.value
    })
  }

  inputTimeUnit(event) {
    this.setState({
      timeUnit: event.target.value
    })
  }

  async setRentalPayment(event) {
    const {deployedHouse} = this.props;
    await setRentalPayment(deployedHouse, {
      rentalPaymentCharge: web3.toWei(this.state.rentalPaymentCharge, 'ether'),
      rentalPaymentStep: toSecond(this.state.rentalPaymentStep, this.state.timeUnit),
      rentalDuration: toSecond(this.state.rentalDuration, this.state.timeUnit),
      rentable: Boolean(this.state.rentable)
    });
  }

  render() {
    const {timeUnit} = this.state;
    const {button} = this.props;
    return (
      <PopUpForm button={button}>
        <div className="formInput">
          <label htmlFor="PaymentCharge">Annual Payment Fee (Ether):</label>
          <input type="number" name="PaymentCharge" onChange={this.inputPaymentCharge.bind(this)}/>
        </div>
        <div className="formInput">
          <label htmlFor="PaymentStep">Pay After x ({timeUnit}):</label>
          <input type="number" name="PaymentStep" onChange={this.inputPaymentStep.bind(this)}/>
        </div>
        <div className="formInput">
          <label htmlFor="Duration">Rental Duration ({timeUnit}):</label>
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
          <label htmlFor="Type">Allow Rent:</label>
          <select name="Type" onChange={this.inputRentable.bind(this)}>
            <option value="true">Yes</option>
            <option value="">No</option>
          </select>
        </div>
        <div className="btn formInput">
          <button onClick={this.setRentalPayment.bind(this)}>Submit</button>
        </div>
      </PopUpForm>
    );
  }
}

export default RentalPopUp;
