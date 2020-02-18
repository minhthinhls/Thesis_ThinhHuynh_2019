import React, {Component, Fragment} from 'react';
import styled from 'styled-components';
import {rentHouse, chargeRentalContract} from '../../services/TransactionService';

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
  .rent_btn {
    height: 45px;
    width: 192px;
    border: 0;
    border-radius: 1em;
    font-size: large;
    background-color: #3fff00;
    color: #000000;
    cursor: pointer;
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
        {!houseInfo.rented || web3.eth.defaultAccount === houseInfo.renter
          ?
          <Fragment>
            <label htmlFor="RentalOption">Rental Options:</label>
            <select name="rentalOption" value={rentalOption}
                    onChange={this.inputRentalOption.bind(this)}>
              <option value="Rent">Start Renting</option>
              <option value="Charge">Rental Annual Payment</option>
            </select>
            <div className="btn">
              <button className="rent_btn" onClick={this.performRentalOption.bind(this)}>
                {rentalOption}
              </button>
            </div>
          </Fragment>
          :
          <Fragment>
            <label htmlFor="RentalOption">Rental Options:</label>
            <div className="btn">
              <button className="rent_btn">
                House Has Been Rented !
              </button>
            </div>
          </Fragment>
        }
      </Selector>
    );
  }
}

export default RentalOption;
