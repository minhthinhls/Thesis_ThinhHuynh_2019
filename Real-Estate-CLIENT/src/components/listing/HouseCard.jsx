import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import Loader from '../../../assets/loader.gif';
import {getDeployedHouse, getHouseInfo} from '../../services/HouseService';
import {fromWei, is} from '../../services/Utils';

const HouseCardStyle = styled.div`
  border-radius: 0.4em;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  background: MidnightBlue;
  color: #fff;
  overflow: hidden;
  margin: 10px;
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  div {
    padding: 5px 10px;
  }
  h3, h5 {
    margin: 5px 0;
  }
  h3 {
    margin: 12px 0;
    font-weight: 300;
    font-size: 25px;
  }
  a {
    color: inherit;
  }
`;

const GridStyle = styled.div`
  @media (min-width: 375px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: center;
  }
`;

class HouseCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      houseInfo: null,
      deployedHouse: null
    };
    this.watchEvents = this.watchEvents.bind(this);
  }

  async componentDidMount() {
    this._isMounted = true;
    const {abi, address} = this.props;
    this.setState({
      houseInfo: await getHouseInfo(abi, address),
      deployedHouse: await getDeployedHouse(abi, address)
    });
    this.watchEvents();
  }

  watchEvents() {
    const {abi, address} = this.props;
    // TODO: trigger event when transaction is made, not when component renders
    try {
      this.state.deployedHouse.allEvents({}, {
        fromBlock: 'latest',
        toBlock: 'latest'
      }).watch((error, event) => {
        if (this._isMounted && !error) {
          console.log("Catch Events emitted by Solidity Contract:", event);
          getHouseInfo(abi, address).then((info) => {
            this.setState({
              houseInfo: info,
            });
          }).catch(error => console.log(error));
        }
      });
    } catch (Exception) {
      console.log("House has not been loaded !");
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    const {address, filter, unitCurrency, unitArea} = this.props;
    const {houseInfo} = this.state;
    const image = `${process.env.PUBLIC_HTTP_PROVIDER}/images/${address}.jpg`;
    const filtered = () => {
      return (houseInfo.location.toLowerCase().indexOf(filter.location.toLowerCase()) !== -1) &&
        (filter.status !== null ? houseInfo.active === filter.status : true) &&
        (option => {
          const selector = {
            null: true,
            'buyable': houseInfo[option],
            'rented': !houseInfo[option],
            'inProcess': !houseInfo[option]
          };
          return selector[option];
        })(filter.option) &&
        (filter.priceLowerRange ? fromWei(houseInfo.price, unitCurrency).greaterThanOrEqualTo(filter.priceLowerRange) : true) &&
        (filter.priceUpperRange ? fromWei(houseInfo.price, unitCurrency).lessThanOrEqualTo(filter.priceUpperRange) : true) &&
        (filter.areaLowerRange ? houseInfo.area >= Number(filter.areaLowerRange) : true) &&
        (filter.areaUpperRange ? houseInfo.area <= Number(filter.areaUpperRange) : true);
    };

    return (houseInfo) ? (
      <HouseCardStyle style={{display: filtered() ? 'block' : 'none'}}>
        <Link to={`/house/${address}`}>
          <img src={image || 'http://placehold.it/200'} alt="List item"/>
          <div>
            <h2>{`Price: ${fromWei(houseInfo.price, unitCurrency).toNumber()} (${unitCurrency})`}</h2>
            <GridStyle>
              <h4>Location: {houseInfo.location}</h4>
              {is(houseInfo.owner) ?
                <button>OWNED !</button>
                :
                (houseInfo.buyable ?
                    <button className='bg-color_orange'>Buy Now !</button>
                    :
                    <button>Cannot Buy Now !</button>
                )
              }
              {is(houseInfo.owner) ? '' :
                <Fragment>
                  <h5>Contact Now !</h5>
                  <h5>{houseInfo.inProcess ?
                    'House has been in Installment Paid process !' :
                    (houseInfo.installable ? 'Pay by Installment Now !' : 'Cannot Installment Paid !')}
                  </h5>
                </Fragment>
              }
              <h6>Area: {houseInfo.area} ({unitArea})</h6>
              <h6>Status: {houseInfo.active ? 'In Active' : 'Not Active'}</h6>
            </GridStyle>
          </div>
        </Link>
      </HouseCardStyle>
    ) : (<div className='loader-img'><img src={Loader} className='Image' alt="loader"/></div>);
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
)(HouseCard);

/**
 * @Deprecated
 * @param children
 * @param address
 * @returns HouseCard as React Hook Component
 * @constructor
 */
const HouseCardHook = ({children, address}) => {
  const image = `${process.env.PUBLIC_HTTP_PROVIDER}/images/${address}.jpg`;
  return (
    <HouseCardStyle>
      <img src={image || 'http://placehold.it/200'} alt="List item"/>
      <div>
        {children}
      </div>
    </HouseCardStyle>
  )
};

export {HouseCardHook};
