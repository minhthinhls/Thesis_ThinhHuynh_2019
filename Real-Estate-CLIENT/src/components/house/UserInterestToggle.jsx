import React, {Component, Fragment} from 'react';
import styled from 'styled-components';
import Switch from 'react-switch';
import HouseInterestPopUp from './HouseInterestPopUp';
import {interestHouse, removeInterestHouse, getInterestUsers} from '../../services/MongoService'

const GridOneColumn = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  text-align: center;
`;

class UserInterestToggle extends Component {
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
        <GridOneColumn>
          <h3>{checked ? `You've already interested !` : `Leave your interest here !`}</h3>
          <Switch onChange={this.handleChange} checked={checked}/>
        </GridOneColumn>
        <HouseInterestPopUp open={checked && hasClicked} {...this.props}/>
      </Fragment>
    );
  }
}

export default UserInterestToggle;
