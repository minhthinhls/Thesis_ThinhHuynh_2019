import React, {Component} from 'react';
import styled from 'styled-components';
import {resetInstallmentContract} from '../../services/OwnerService';
import InstallmentPopUp from './InstallmentPopUp';

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
    const {deployedHouse} = this.props;
    if (this.state.installmentOption === 'Reset') {
      await resetInstallmentContract(deployedHouse);
    } else {
      throw Error("Event has not been defined yet !");
    }
  }

  render() {
    const {installmentOption} = this.state;
    const {deployedHouse} = this.props;
    return (
      <Selector>
        <div className="item">
          <label htmlFor="InstallmentPaymentOption">Owner Installment Options:</label>
          <select name="installmentPaymentOption" value={installmentOption}
                  onChange={this.inputInstallmentOption.bind(this)}>
            <option value="Reset">Reset Installment Contract !</option>
            <option value="SetInstallmentDetail">Set Installment Payment !</option>
          </select>
          <div className="btn">
            {installmentOption === 'Reset'
              ?
              <button className='installment_btn' onClick={this.performInstallmentOption.bind(this)}>
                {installmentOption} Contract
              </button>
              :
              <InstallmentPopUp button={<button className='installment_btn'>{installmentOption}</button>}
                                deployedHouse={deployedHouse}/>
            }
          </div>
        </div>
      </Selector>
    );
  }
}

export default OwnerInstallmentOption;
