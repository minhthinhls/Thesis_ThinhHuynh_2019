import React, {Component, Fragment} from 'react';
import Switch from 'react-switch';
import HouseInterestPopUp from '../house/HouseInterestPopUp';
import {interestHouse, removeInterestHouse, getInterestUsers} from '../../services/MongoService';

class Toggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      hasClicked: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    getInterestUsers({...this.props}).then((users) => {
      this.setState({
        checked: users.includes(web3.eth.defaultAccount)
      });
    });
  }

  handleChange(checked) {
    (checked ?
        interestHouse({...this.props})
        :
        removeInterestHouse({...this.props})
    ).then(() => {
      this.setState({
        checked,
        hasClicked: true
      });
    });
  }

  render() {
    const {checked, hasClicked} = this.state;
    return (
      <Fragment>
        <Switch onChange={this.handleChange} checked={checked}/>
        <HouseInterestPopUp open={checked && hasClicked} {...this.props}/>
      </Fragment>
    );
  }
}

export default Toggle;
