import React, {Component} from 'react';
import {PopUpForm} from '../utils/PopUpForm';
import {ToastButton} from '../utils/ToastNotification';
import {getUserInfo, updateUserInfo} from '../../services/MongoService';

class HouseInterestPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null,
      phone: null
    };
  }

  componentDidMount() {
    getUserInfo().then((info) => {
      this.setState({
        ...info
      });
    });
  }

  inputName(event) {
    this.setState({
      name: event.target.value
    });
  }

  inputEmail(event) {
    this.setState({
      email: event.target.value
    });
  }

  inputPhone(event) {
    this.setState({
      phone: event.target.value
    });
  }

  setHouseDetail(event) {
    updateUserInfo({
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      ...this.props
    }).then(() => {
      console.log("Upload success !");
    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    const {name, email, phone} = this.state;
    return (
      <PopUpForm {...this.props}>
        <div className="formInput">
          <label htmlFor="Name">Your Name:</label>
          <input type="text" name="Name" value={name} onChange={this.inputName.bind(this)}/>
        </div>
        <div className="formInput">
          <label htmlFor="Email">Your Email:</label>
          <input type="text" name="Email" value={email} onChange={this.inputEmail.bind(this)}/>
        </div>
        <div className="formInput">
          <label htmlFor="Phone">Your Phone:</label>
          <input type="text" name="Phone" value={phone} onChange={this.inputPhone.bind(this)}/>
        </div>
        <ToastButton onSuccess={`Successfully Sending Your Request !`}
                     onClick={this.setHouseDetail.bind(this)}>Update Info !
        </ToastButton>
      </PopUpForm>
    );
  }
}

export default HouseInterestPopUp;
