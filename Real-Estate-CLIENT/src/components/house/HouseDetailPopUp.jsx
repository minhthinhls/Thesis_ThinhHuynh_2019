import React, {Component} from 'react';
import {setHouseDetail} from '../../services/OwnerService';
import {ToastButton} from '../utils/ToastNotification';
import {PopUpForm} from '../utils/PopUpForm';
import {is} from '../../services/Utils';

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
    this.setState({...this.props.houseInfo});
  }

  inputLocation(event) {
    this.setState({
      location: event.target.value
    });
  }

  inputArea(event) {
    this.setState({
      area: event.target.value
    });
  }

  inputActive(event) {
    this.setState({
      active: event.target.value
    });
  }

  async setHouseDetail(event) {
    const {deployedHouse} = this.props;
    await setHouseDetail(deployedHouse, {
      location: this.state.location,
      area: this.state.area,
      active: JSON.parse(this.state.active)
    });
  }

  render() {
    const {trigger, houseInfo} = this.props;
    const {location, area, active} = this.state;
    const isOwner = is(houseInfo.owner);
    return (
      <PopUpForm trigger={trigger}>
        <div className="formInput">
          <label htmlFor="Location">Location: {houseInfo.location}</label>
          {isOwner ?
            <input type="text" name="Location" value={location} onChange={this.inputLocation.bind(this)}/> : ''
          }
        </div>
        <div className="formInput">
          <label htmlFor="Area">Area: {houseInfo.area} (m^2)</label>
          {isOwner ?
            <input type="text" name="Area" value={area} onChange={this.inputArea.bind(this)}/> : ''
          }
        </div>
        <div className="formInput">
          <label htmlFor="Active">Active House: {houseInfo.active ? 'In Active' : 'Not Active'}</label>
          {isOwner ?
            <select name="Active" defaultValue={active} onChange={this.inputActive.bind(this)}>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select> : ''
          }
        </div>
        <div className="formInput">
          {isOwner ?
            <ToastButton onSuccess={`Successfully Update Installment Payment !`}
                         onClick={this.setHouseDetail.bind(this)}>Update !
            </ToastButton> : ''
          }
        </div>
      </PopUpForm>
    );
  }
}

export default HouseDetailPopUp;
