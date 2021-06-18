import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setBuyPayment} from '../../../services/OwnerService';
import {ToastButton} from '../../utils/ToastNotification';
import {fromWei, toWei} from '../../../services/Utils';
import {PopUpForm} from '../../utils/PopUpForm';

class BuyNowPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 0,
      buyable: null,
      active: null
    };
  }

  componentDidMount() {
    const {price, ...rest} = this.props.houseInfo;
    this.setState({
      price: fromWei(price, this.props.unitCurrency),
      ...rest
    });
  }

  inputPrice(event) {
    this.setState({
      price: event.target.value
    });
  }

  inputBuyable(event) {
    this.setState({
      buyable: event.target.value
    });
  }

  inputActive(event) {
    this.setState({
      active: event.target.value
    });
  }

  async setBuyPayment(event) {
    await setBuyPayment(this.props.deployedHouse, {
      price: toWei(this.state.price, this.props.unitCurrency),
      buyable: JSON.parse(this.state.buyable),
      active: JSON.parse(this.state.active)
    });
  }

  render() {
    const {trigger, houseInfo, unitCurrency} = this.props;
    return (
      <PopUpForm trigger={trigger}>
        <div className="formInput">
          <label htmlFor="Price">Price: {fromWei(houseInfo.price, unitCurrency).toNumber()} ({unitCurrency})</label>
          <input type="number" name="Price" defaultValue={fromWei(houseInfo.price, unitCurrency).toNumber()}
                 onChange={this.inputPrice.bind(this)}/>
        </div>
        <div className="formInput">
          <label htmlFor="Buyable">Allow to Buy: {houseInfo.buyable ? 'Yes' : 'No'}</label>
          <select name="Buyable" defaultValue={this.state.buyable} onChange={this.inputBuyable.bind(this)}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <div className="formInput">
          <label htmlFor="Active">Active House: {houseInfo.active ? 'In Active' : 'Not Active'}</label>
          <select name="Active" defaultValue={this.state.active} onChange={this.inputActive.bind(this)}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <ToastButton onSuccess={`Successfully Update Buy Now Payment !`}
                     onClick={this.setBuyPayment.bind(this)}>Confirm Update !
        </ToastButton>
      </PopUpForm>
    );
  }
}

const mapStateToProps = function (store) {
  return {
    unitCurrency: store.unitCurrency,
    unitArea: store.unitArea
  };
};

export default connect(
  mapStateToProps, /* mapStateToProps */
  null /* mapDispatchToProps */
)(BuyNowPopUp);
