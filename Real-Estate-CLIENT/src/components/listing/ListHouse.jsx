import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import styled from 'styled-components';
import QueryString from 'query-string';
import LazyLoad from 'react-lazyload';
import HouseCard from './HouseCard';
import {connect} from 'react-redux';
import {getHouseAddresses} from '../../services/HouseAdminService';
import {getHouseContract} from '../../services/HouseService';
import {changeCurrencyUnit, changeAreaUnit} from '../../redux/actions/actions';

const List = styled.div`
  padding: 20px 0;
  .listGroup {
    width: 90%;
    margin: 0px auto;
  }
  .listLeft {
    top: 5%;
    position: sticky;
    margin-top: 10px;
    text-align: center;
    @media (min-width: 1024px) {
      height: 515px;
    }
  }
  input {
    width: 239px;
    height: 30px;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 10px;
    @media (min-width: 425px) {
      width: 315px;
    }
    @media (min-width: 768px) {
      width: 425px;
    }
    @media (min-width: 1024px) {
      width: 90%;
    }
  }
  select {
    border-radius: 0.4em;
    width: 239px;
    height: 30px;
    border: 0;
    margin-top: 20px;
    margin-bottom: 20px;
    @media (min-width: 425px) {
      width: 315px;
    }
    @media (min-width: 768px) {
      width: 425px;
    }
    @media (min-width: 1024px) {
      width: 90%;
    }
  }
  button {
    margin: auto;
    height: 45px;
    width: 75%;
    border: 0;
    border-radius: 0.8em;
    font-size: larger;
    background-color: #bbbbbb;
    color: black;
    cursor: pointer;
  }
  .bg-color_orange {
    background-color: #ff3b00;
  }
  .search_btn {
    background-color: MidnightBlue;
    color: white;
  }
  @media (min-width: 1024px) {
    .listGroup {
      display: grid;
      grid-template-columns: 1fr 3fr;
      grid-gap: 20px;
    }
    .listLeft {
      height: auto;
      width: 100%;
      background-color: #b7c2f1;
      border-radius: 0.4em;
      border-bottom-left-radius: 0.4em;
      @media (min-width: 1024px) {
        height: 515px;
      }
    }
    .listRight {
      height: auto;
    }
  }
`;

const ListRight = styled.div`
  @media (min-width: 768px) {
    .loader-img {
      width: 345px;
      margin: 0px auto;
    }
  }
  .right {
    @media (min-width: 768px) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 1440px) {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }
  }
  .Image {
    width: 100%;
    margin: 0px auto;
  }
`;

const GridStyle = styled.div`
  width: 90%;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  text-align: center;
`;

class Listing extends Component {
  constructor() {
    super();
    this.state = {
      addresses: [],
      location: "",
      status: null,
      option: null,
      priceLowerRange: "",
      priceUpperRange: "",
      areaLowerRange: "",
      areaUpperRange: "",
      houseContract: null
    };
  }

  async componentDidMount() {
    const {location: {search}} = this.props;
    if (search) {
      const params = QueryString.parse(search);
      this.setState({
        location: params.location,
        status: JSON.parse(params.status),
        option: params.option,
        priceLowerRange: params.priceLowerRange,
        priceUpperRange: params.priceUpperRange,
        areaLowerRange: params.areaLowerRange,
        areaUpperRange: params.areaUpperRange,
      });
      this.props.changeCurrencyUnit(params.unitCurrency);
      this.props.changeAreaUnit(params.unitArea);
    }
    this.setState({
      houseContract: await getHouseContract(),
      addresses: await getHouseAddresses()
    });
  }

  // async componentWillUpdate() {
  //   const {location: {search}} = this.props;
  //   if (search) {
  //     const params = QueryString.parse(search);
  //     this.props.changeCurrencyUnit(params.unitCurrency);
  //     this.props.changeAreaUnit(params.unitArea);
  //   }
  // }

  componentWillUnmount() {
    console.log("List House Unmounted !");
  }

  locationChange(e) {
    this.setState({
      location: e.target.value
    });
  }

  statusChange(e) {
    this.setState({
      status: JSON.parse(e.target.value)
    });
  }

  optionChange(e) {
    this.setState({
      option: e.target.value
    });
  }

  priceLowerRangeChange({target: {value}}) {
    this.setState({
      priceLowerRange: value
    });
  }

  priceUpperRangeChange({target: {value}}) {
    this.setState({
      priceUpperRange: value
    });
  }

  areaLowerRangeChange({target: {value}}) {
    this.setState({
      areaLowerRange: value
    });
  }

  areaUpperRangeChange({target: {value}}) {
    this.setState({
      areaUpperRange: value
    });
  }

  render() {
    const {addresses, houseContract, ...restState} = this.state;
    const filter = {...restState};
    return (
      <div>
        <List>
          <div className="listGroup">
            <div className="listLeft">
              <h3>Filter</h3>
              <form className="app-select">
                <div className="Location">
                  <input type="search" id="location" name="location" placeholder='Location'
                         onChange={this.locationChange.bind(this)} value={this.state.location}/>
                </div>
                <div className="Status">
                  <select name="status" id="status"
                          onChange={this.statusChange.bind(this)} value={this.state.status}>
                    <option value={`null`}>Status</option>
                    <option value={true}>Active</option>
                    <option value={false}>Not Active</option>
                  </select>
                </div>
                <div className="Option">
                  <select name="option" id="option"
                          onChange={this.optionChange.bind(this)} value={this.state.option}>
                    <option value="null">Option</option>
                    <option value="buyable">Buy</option>
                    <option value="inProcess">Pay by Installment</option>
                  </select>
                </div>
                <div className="PriceRange">
                  <div>{`House Price (${this.props.unitCurrency})`}</div>
                  <GridStyle>
                    <input type="number" id="priceLowerRange" name="priceLowerRange" placeholder="Lower Price"
                           onChange={this.priceLowerRangeChange.bind(this)}
                           defaultValue={this.state.priceLowerRange}/>
                    <input type="number" id="priceUpperRange" name="priceUpperRange" placeholder="Upper Price"
                           onChange={this.priceUpperRangeChange.bind(this)}
                           defaultValue={this.state.priceUpperRange}/>
                  </GridStyle>
                </div>
                <div className="AreaRange">
                  <div>{`House Area (${this.props.unitArea})`}</div>
                  <GridStyle>
                    <input type="text" id="areaLowerRange" name="areaLowerRange" placeholder="Lower Area"
                           onChange={this.areaLowerRangeChange.bind(this)} defaultValue={this.state.areaLowerRange}/>
                    <input type="text" id="areaUpperRange" name="areaUpperRange" placeholder="Upper Area"
                           onChange={this.areaUpperRangeChange.bind(this)} defaultValue={this.state.areaUpperRange}/>
                  </GridStyle>
                </div>
                <div style={{display: 'none'}}>
                  <input type="text" id="unitCurrency" name="unitCurrency" defaultValue={this.props.unitCurrency}/>
                  <input type="text" id="unitArea" name="unitArea" defaultValue={this.props.unitArea}/>
                </div>
                <button className='search_btn'>Search Properties</button>
              </form>
            </div>
            <ListRight>
              <div className="loader">
                {addresses.length ? '' : (<h3>There are no list items</h3>)}
              </div>
              <div className="right">
                {addresses.map(address => (
                  <LazyLoad key={address} offset={[-50, 0]} height={200} once={true}>
                    <HouseCard address={address} abi={houseContract['abi']} filter={filter}/>
                  </LazyLoad>
                ))}
              </div>
            </ListRight>
          </div>
        </List>
      </div>
    )
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
  {
    changeCurrencyUnit: changeCurrencyUnit,
    changeAreaUnit: changeAreaUnit
  } /* mapDispatchToProps */
)(withRouter(Listing));
