import React, {Component} from 'react';
import styled from 'styled-components';
import Loader from '../../../assets/loader.gif';
import {getDeployedHouse, getHouseInfo} from '../../services/HouseService';

const HouseCardStyle = styled.div`
  border-radius: 0.4em;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  background: #031249;
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

const Info = styled.div`
  @media (min-width: 375px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: center;
  }
`;

class HouseCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reloaded: false,
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
      deployedHouse: await getDeployedHouse(abi, address),
      reloaded: true
    });
    this.watchEvents();
  }

  watchEvents() {
    const {abi, address} = this.props;
    // TODO: trigger event when vote is counted, not when component renders
    this.state.deployedHouse.allEvents({}, {
      fromBlock: 'latest',
      toBlock: 'latest'
    }).watch((error, event) => {
      if (this._isMounted) {
        console.log(error, event);
        this.setState({
          reloaded: false
        });
        this.setState({
          reloaded: true
        });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    const {address, filter} = this.props;
    const {houseInfo, reloaded} = this.state;
    const image = `http://localhost:8080/public/images/${address}.jpg`;
    const filtered = () => {
      return houseInfo.location.toLowerCase().indexOf(filter.location.toLowerCase()) !== -1;
    };

    return (houseInfo && reloaded && filtered()) ? (
      <HouseCardStyle>
        <img src={image || 'http://placehold.it/200'} alt="List item"/>
        <div>
          <h2>Price: {houseInfo.price} $</h2>
          <Info>
            <h4>Location: {houseInfo.location}</h4>
            <h4>
              {web3.eth.defaultAccount === houseInfo.owner ? 'OWNED' :
                <button type="submit" className='buy_btn'>Buy Now !</button>
              }
            </h4>
          </Info>
          <Info>
            <h6>Bedrooms: {houseInfo.bedrooms} bedroom(s)</h6>
            <h6>Bathrooms: {houseInfo.bathrooms} bathroom(s)</h6>
            <h6>Area: {houseInfo.area} square meters</h6>
            <h6>Status: {houseInfo.status ? 'In Active' : 'Not Active'}</h6>
          </Info>
        </div>
      </HouseCardStyle>
    ) : (<div className='loader-img'><img src={Loader} className='Image' alt="loader"/></div>);
  }
}

const HouseCard = ({children, address}) => {
  const image = `http://localhost:8080/public/images/${address}.jpg`;
  return (
    <HouseCardStyle>
      <img src={image || 'http://placehold.it/200'} alt="List item"/>
      <div>
        {children}
      </div>
    </HouseCardStyle>
  )
};

export default HouseCard;
