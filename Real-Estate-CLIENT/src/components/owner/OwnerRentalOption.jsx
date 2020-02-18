import React, {Component} from 'react';
import styled from 'styled-components';
import {resetRentalContract} from '../../services/OwnerService';
import RentalPopUp from './RentalPopUp';

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
    })
  }

  async performRentalOption(event) {
    event.preventDefault();
    const {deployedHouse} = this.props;
    if (this.state.rentalOption === 'Reset') {
      await resetRentalContract(deployedHouse);
    } else {
      throw Error("Event has not been defined yet !");
    }
  }

  render() {
    const {rentalOption} = this.state;
    const {deployedHouse} = this.props;
    return (
      <Selector>
        <div className="item">
          <label htmlFor="RentalOption">Owner Rental Options:</label>
          <select name="rentalOption" value={rentalOption}
                  onChange={this.inputRentalOption.bind(this)}>
            <option value="Reset">Reset Rental Contract !</option>
            <option value="SetRentalDetail">Set Rental Payment !</option>
          </select>
          <div className="btn">
            {rentalOption === 'Reset'
              ?
              <button className='rent_btn' onClick={this.performRentalOption.bind(this)}>
                {rentalOption} Contract
              </button>
              :
              <RentalPopUp button={<button className='rent_btn'>{rentalOption}</button>}
                           deployedHouse={deployedHouse}/>
            }
          </div>
        </div>
      </Selector>
    );
  }
}

export default OwnerRentalOption;
