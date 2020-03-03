import React, {Component} from 'react';
import styled from 'styled-components';
import {resetRentalContract} from '../../../services/OwnerService';
import {ToastButton} from '../../utils/ToastNotification';
import RentalPopUp from './RentalPopUp';
import SelectOption from '../stylesheet/SelectOption';

/* Override the background color <gray> of component button ! */
const Selector = styled(SelectOption)`
  && button {
    background-color: Lime;
  }
`;

class OwnerRentalOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rentalOption: 'Reset',
    };
  }

  async componentDidMount() {
    // To Do !
  }

  inputRentalOption(event) {
    this.setState({
      rentalOption: event.target.value
    });
  }

  async performRentalOption(event) {
    if (this.state.rentalOption === 'Reset') {
      await resetRentalContract(this.props.deployedHouse);
    } else {
      throw Error("Event has not been defined yet !");
    }
  }

  render() {
    const {rentalOption} = this.state;
    return (
      <Selector>
        <label htmlFor="RentalOption">Owner Rental Options:</label>
        <select name="rentalOption" value={rentalOption}
                onChange={this.inputRentalOption.bind(this)}>
          <option value="Reset">Reset Rental Contract !</option>
          <option value="SetRentalDetail">Set Rental Payment !</option>
        </select>
        {rentalOption === 'Reset'
          ?
          <ToastButton onSuccess={`Successfully Reset Installment Contract !`}
                       onClick={this.performRentalOption.bind(this)}>
            {`Reset Contract !`}
          </ToastButton>
          :
          <RentalPopUp trigger={<button>{`Set Rental Detail`}</button>}
                       deployedHouse={this.props.deployedHouse}/>
        }
      </Selector>
    );
  }
}

export default OwnerRentalOption;
