import React, {Component} from 'react';
import styled from 'styled-components';
import LazyLoad from 'react-lazyload';
import Navbar from '../NavBar';
import Footer from '../Footer';
import HouseCard from './HouseCard';
import {getHouseAddresses} from '../../services/HouseAdminService';
import {getHouseContract} from '../../services/HouseService';

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

class Listing extends Component {
  constructor() {
    super();
    this.state = {
      addresses: [],
      location: "",
      propertyType: "",
      houseContract: null
    };
  }

  async componentDidMount() {
    this.setState({
      houseContract: await getHouseContract(),
      addresses: await getHouseAddresses()
    });
  }

  locationChange(e) {
    this.setState({
      location: e.target.value
    });
  }

  propertyChange(e) {
    this.setState({
      propertyType: e.target.value
    });
  }

  render() {
    const {addresses, location, houseContract} = this.state;
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
        <Footer/>
      </div>
    )
  }
}

export default Listing;
