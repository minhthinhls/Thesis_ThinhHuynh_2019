import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../NavBar';
import Footer from '../Footer';
import HouseCard from './HouseCard';
import Loader from '../../../assets/loader.gif';
import {getHouseAddresses, getAllHouseInfo} from '../../services/HouseAdminService';

const List = styled.div`
  padding: 50px 0;
  .listGroup {
    width: 90%;
    margin: 0px auto;
  }
  .listLeft {
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
      width: 280px;
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
      width: 280px;
    }
  }
  .prop_btn {
    height: 45px;
    width: 192px;
    border: 0;
    border-radius: 0.5em;
    font-size: larger;
    padding: -23px;
    background-color: #031249;
    color: #b7c2f1;
  }
  .buy_btn {
    height: 45px;
    width: 75%;
    border: 0;
    border-radius: 1em;
    font-size: large;
    background-color: #ff3b00;
    color: #000000;
  }
  .cannot_buy {
    background-color: #bbbbbb;
  }
  @media (min-width: 1024px) {
    .listGroup {
      display: grid;
      grid-template-columns: 1fr 3fr;
      grid-gap: 20px;
    }
    .listLeft {
      height: auto;
      width: 300px;
      padding: 15px 0;
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
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 1440px) {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  .Image {
    width: 100%;
    margin: 0px auto;
  }
`;

const Info = styled.div`
  @media (min-width: 375px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: center;
  }
`;

class Listing extends Component {
  constructor() {
    super();
    this.state = {
      houses: [],
      ready: 'initial',
      location: "",
      propertyType: "",
      addresses: []
    };
  }

  async componentDidMount() {
    this.setState({
      ready: 'loading',
      addresses: await getHouseAddresses()
    });

    const {addresses} = this.state;

    this.setState({
      houses: await getAllHouseInfo(addresses),
      ready: 'loaded'
    });

  }

  locationChange(e) {
    this.setState({
      location: e.target.value
    })
  }

  propertyChange(e) {
    this.setState({
      propertyType: e.target.value
    })
  }

  render() {
    const {houses, ready, location, houseContract, addresses} = this.state;
    const filteredHouses = houses.filter(house => {
      return house.location.toLowerCase().indexOf(location.toLowerCase()) !== -1;
    });

    const filter = {
      location: location
    };

    return (
      <div>
        <Navbar/>
        <List>
          <div className="listGroup">
            <div className="listLeft">
              <h3>Filter</h3>
              <form>
                <input type="search" name="search" placeholder='Location' onChange={this.locationChange.bind(this)}/>
                <div className="Property">
                  <select name="property-type" className="app-select" required
                          onChange={this.propertyChange.bind(this)}>
                    <option data-display="Property Type">Property Type</option>
                    <option value="1">Modern Luxury Townhouse</option>
                    <option value="2">Terraced duplex</option>
                    <option value="3">Urban Townhouse</option>
                    <option value="3">Downtown Condo</option>
                    <option value="3">Modern Beach House</option>
                    <option value="3"> Luxury Hampton Home</option>
                    <option value="3"> Detached Duplex</option>
                    <option value="3"> Semi-Detached Duplex</option>
                    <option value="3"> Detached Bungalow</option>
                  </select>
                </div>

                <div className="bedrooms">
                  <select name="bedroom" className="app-select" required>
                    <option data-display="Bedrooms">Bedrooms</option>
                    <option value="1">1BR</option>
                    <option value="2">2BR</option>
                    <option value="3">3BR</option>
                    <option value="4">4BR</option>
                    <option value="5">5BR</option>
                  </select>
                </div>

                <div className="PriceRange">
                  <input type="text" id="range" name="range" placeholder='Price Range'/>
                </div>
                <div className="AreaRange">
                  <input type="text" id="range2" name="range" placeholder='Area Range'/>
                </div>
                <div className="button">
                  <button className='prop_btn'>Search Properties</button>
                </div>
              </form>
            </div>
            <ListRight>
              <div className="loader">
                {houses.length ? '' : (<h3>There are no list items</h3>)}
                {ready === 'loading' ? (
                  <div className='loader-img'><img src={Loader} className='Image' alt="loader"/></div>) : ''}
              </div>
              <div className="right">
                {/*{addresses.map(address => (*/}
                {/*<div key={address}>*/}
                {/*<Link to={`/house/${address}`}>*/}
                {/*<HouseCard address={address} abi={houseContract['abi']} filter={filter}/>*/}
                {/*</Link>*/}
                {/*</div>*/}
                {/*))}*/}
                {filteredHouses.map(houseInfo => (
                  <div key={houseInfo.address}>
                    <Link to={`/house/${houseInfo.address}`}>
                      <HouseCard address={houseInfo.address}>
                        <h2>Price: {web3.fromWei(houseInfo.price, 'ether').toNumber()} $</h2>
                        <Info>
                          <h4>Location: {houseInfo.location}</h4>
                          <h4>
                            {web3.eth.defaultAccount === houseInfo.owner
                              ?
                              <button className='buy_btn cannot_buy'>OWNED !</button>
                              :
                              (houseInfo.buyable
                                  ?
                                  <button className='buy_btn'>Buy Now !</button>
                                  :
                                  <button className='buy_btn cannot_buy'>Cannot Buy Now !</button>
                              )
                            }
                          </h4>
                        </Info>
                        <Info>
                          {web3.eth.defaultAccount === houseInfo.owner ? '' :
                            <Fragment>
                              <h5>{houseInfo.rented ?
                                'House has been Rented !' :
                                (houseInfo.rentable ? 'Rent Now !' : 'Cannot Rent !')}
                              </h5>
                              <h5>{houseInfo.inProcess ?
                                'House has been in Installment Paid process !' :
                                (houseInfo.installable ? 'Pay by Installment Now !' : 'Cannot Installment Paid !')}
                              </h5>
                            </Fragment>
                          }
                          <h6>Area: {houseInfo.area} square meters</h6>
                          <h6>Status: {houseInfo.active ? 'In Active' : 'Not Active'}</h6>
                        </Info>
                      </HouseCard>
                    </Link>
                  </div>
                ))}
              </div>
            </ListRight>
          </div>
        </List>
        <Footer/>
      </div>
    )
  }
}

export default Listing;
