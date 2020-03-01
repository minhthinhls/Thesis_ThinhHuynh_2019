import React, {Component} from 'react';
import {PopUpForm} from '../utils/PopUpForm';

class CheckBalancePopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: null
    };
  }

  async componentDidMount() {
    // To Do !
  }

  inputAddress(event) {
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
    const {balance} = this.state;
    return (
      <PopUpForm {...this.props}>
        <div className="formInput">
          <label htmlFor="Address">Address (Public Key):</label>
          <input type="text" name="Address" onChange={this.inputAddress.bind(this)}/>
        </div>
        <div className="btn formInput">
          <button>{Number(web3.fromWei(balance, 'ether'))} Ether</button>
        </div>
      </PopUpForm>
    );
  }
}

export default CheckBalancePopUp;
