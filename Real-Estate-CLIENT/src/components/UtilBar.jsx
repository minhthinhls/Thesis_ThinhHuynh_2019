import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {changeCurrencyUnit} from '../redux/actions/actions';

const NavPanel = styled.div`
  top: 0px;
  position: sticky;
  width: 100%;
  background-color: DarkOrange;
  padding: 10px;
  select {
    display: inline-block;
    width: 20%
    height: 20px;
    border-radius: 0.4em;
  }
`;

class UtilBar extends Component {
  constructor() {
    super();
    this.state = {
      condition: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.changeCurrencyUnit(e.target.value);
  }

  render() {
    const {defaultAccount} = this.props;
    return (
      <NavPanel>
        <select name="status" id="status" onChange={this.handleChange} value={this.props.unitCurrency}>
          <option value={`ETH`}>ETH</option>
          <option value={`USD`}>USD</option>
          <option value={`VND`}>VNĐ</option>
        </select>
        <div style={{display: 'inline-block', float: 'right'}}>
          {`Your account: ${defaultAccount}`}
        </div>
      </NavPanel>
    )
  }

}

const mapStateToProps = function (store) {
  return {
    unitCurrency: store.unitCurrency
  };
};

export default connect(
  mapStateToProps, /* mapStateToProps */
  {
    changeCurrencyUnit: changeCurrencyUnit
  } /* mapDispatchToProps */
)(UtilBar);
