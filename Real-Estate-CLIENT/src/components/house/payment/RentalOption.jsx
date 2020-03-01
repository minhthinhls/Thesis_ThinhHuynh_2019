import React, {Component, Fragment} from 'react';
import styled from 'styled-components';
import {rentHouse, chargeRentalContract} from '../../../services/TransactionService';
import {ToastButton} from '../../utils/ToastNotification';
import SelectOption from '../stylesheet/SelectOption';
import {is} from '../../../services/Utils';

/* Override the background color <gray> of component button ! */
const Selector = styled(SelectOption)`
  && button {
    background-color: Lime;
  }
`;

class RentalOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rentalOption: 'Rent',
    };
  }

  async componentDidMount() {
    // To Do !
  }

  inputRentalOption(event) {
    this.setState({
      rentalOption: event.target.value
    })
  }

  async performRentalOption(event) {
    const {deployedHouse, houseInfo} = this.props;
    if (this.state.rentalOption === 'Rent') {
      await rentHouse(deployedHouse, houseInfo.rentalPaymentCharge);
    } else if (this.state.rentalOption === 'Charge') {
      await chargeRentalContract(deployedHouse, houseInfo.rentalPaymentCharge);
    }
  }

  render() {
    const {rentalOption} = this.state;
    const {houseInfo} = this.props;
    return (
      <Selector>
        {!houseInfo.rented || is(houseInfo.renter)
          ?
          <Fragment>
            <label htmlFor="RentalOption">Rental Options:</label>
            <select name="rentalOption" value={rentalOption}
                    onChange={this.inputRentalOption.bind(this)}>
              <option value="Rent">Start Renting</option>
              <option value="Charge">Rental Annual Payment</option>
            </select>
            <ToastButton onSuccess={`Successfully Charge Rental Contract !`}
                         onClick={this.performRentalOption.bind(this)}>
              {rentalOption}
            </ToastButton>
          </Fragment>
          :
          <Fragment>
            <label htmlFor="RentalOption">Rental Options:</label>
            <button>
              House Has Been Rented !
            </button>
          </Fragment>
        }
      </Selector>
    );
  }
}

export default RentalOption;
