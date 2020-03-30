import React, {Component} from 'react';
import {PopUpForm} from '../utils/PopUpForm';

class CheckBalancePopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      balance: null
    };
  }

  componentDidMount() {
    // TODO: Put your optional code here !
  }

  inputAddress(event) {
    this.setState({
      address: event.target.value
    });
    try {
      web3.eth.getBalance(event.target.value, (error, value) => {
        if (!error) {
          this.setState({
            balance: value
          });
        }
      });
    } catch (Exception) {
      /* Catch the Exception and does not throw it out ! */
      this.setState({
        balance: 0
      });
    }
  }

  render() {
    const {address, balance} = this.state;
    return (
      <PopUpForm {...this.props}>
        <div className="formInput">
          <label htmlFor="Address">Address (Public Key):</label>
          <input type="text" name="Address" value={address} onChange={this.inputAddress.bind(this)}/>
        </div>
        <button>{Number(web3.fromWei(balance, 'ether'))} Ether</button>
      </PopUpForm>
    );
  }
}

export default CheckBalancePopUp;
