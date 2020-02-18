import React, {Component} from 'react';
import {setHouseDetail} from '../../services/OwnerService';
import PopUpForm, {PopUp} from '../owner/PopUpForm';

class HouseDetailPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      area: null,
      active: null
    };
  }

  async componentDidMount() {
    // To Do !
  }

  inputLocation(event) {
    this.setState({
      location: event.target.value
    })
  }

  inputArea(event) {
    this.setState({
      area: event.target.value
    })
  }

  inputActive(event) {
    this.setState({
      active: event.target.value
    })
  }

  async setHouseDetail(event) {
    const {deployedHouse} = this.props;
    await setHouseDetail(deployedHouse, {
      location: this.state.location,
      area: this.state.area,
      active: Boolean(this.state.active)
    });
  }

  render() {
    const {button, position, houseInfo} = this.props;
    return (
      <PopUpForm button={button} position={position}>
        <div className="formInput">
          <label htmlFor="Location">Location: {houseInfo.location}</label>
          {web3.eth.defaultAccount === houseInfo.owner ?
            <input type="text" name="Location" onChange={this.inputLocation.bind(this)}/> : ''
          }
        </div>
        <div className="formInput">
          <label htmlFor="Area">Area: {houseInfo.area} (m^2)</label>
          {web3.eth.defaultAccount === houseInfo.owner ?
            <input type="text" name="Area" onChange={this.inputArea.bind(this)}/> : ''
          }
        </div>
        <div className="formInput">
          <label htmlFor="Active">Active House: {houseInfo.active ? 'In Active' : 'Not Active'}</label>
          {web3.eth.defaultAccount === houseInfo.owner ?
            <select name="Active" onChange={this.inputActive.bind(this)}>
              <option value="true">Yes</option>
              <option value="">No</option>
            </select> : ''
          }
        </div>
        <div className="btn formInput">
          {web3.eth.defaultAccount === houseInfo.owner ?
            <button onClick={this.setHouseDetail.bind(this)}>Submit</button> : ''
          }
        </div>
      </PopUpForm>
    );
  }
}

export default HouseDetailPopUp;
