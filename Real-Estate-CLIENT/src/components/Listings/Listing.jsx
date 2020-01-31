import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../Navbar';
import Footer from '../Footer';
import ListItems from './ListItems';
import Loader from '../../../assets/loader.gif';
import axios from 'axios';

const List = styled.div`
  padding:50px 0;
  .listgroup{
    width:90%;
    margin: 0px auto;
  }
  
  .listLeft{
    text-align:center;
    @media (min-width: 1024px){
      height: 515px;
    }
  }
  
  input{
    width: 239px;
    height: 30px;
    margin-top: 20px;
    margin-bottom: 20px;
    padding:10px;
    @media (min-width:425px){
      width: 315px;
    }
    @media (min-width: 768px){
      width: 425px;
    }
    @media (min-width: 1024px){
      width: 280px;
    }
  }

  select{
    border-radius: 0.4em;
    width: 239px;
    height: 30px;
    border: 0;
    margin-top: 20px;
    margin-bottom: 20px;
    @media (min-width:425px){
      width: 315px;
    }
    @media (min-width: 768px){
    width: 425px;
    }
    @media (min-width: 1024px){
      width: 280px;
    }
  }
  
  .propt_btn{
    height: 45px;
    width: 192px;
    border: 0;
    border-radius: 0.5em;
    font-size: larger;
    padding: -23px; 
    background-color: #031249;
    color: #b7c2f1;
  }
  
  .buy_btn{
    height: 45px;
    width: 75%;
    border: 0;
    border-radius: 1.0em;
    font-size: large;
    background-color: #ff3b00;
    color: #000000;
  }

  @media (min-width: 1024px){
    .listgroup{
      display:grid;
      grid-template-columns:1fr 3fr;
      grid-gap: 20px;
    }
    
    .listLeft{
      height:auto;
      width:300px;
      padding:15px 0;
      background-color: #b7c2f1;
      border-radius: 0.4em;
      border-bottom-left-radius: 0.4em;
      @media (min-width: 1024px){
        height:515px;
      }
    }
    
    .listRight{
      height:auto;
    }
  }
`;

const ListRight = styled.div`
  @media (min-width: 768px){  
    .loader-img{
        width: 345px;
        margin: 0px auto;
    }
  }
  
  .right{
    @media (min-width: 768px){
      display:grid;
      grid-template-columns:1fr 1fr;
      
    }
    @media (min-width: 1440px){
      display:grid;
      grid-template-columns:1fr 1fr 1fr;
    }
  }
  
  .Image {
    width: 100%;
    margin: 0px auto;
    }
  }
`;

const Info = styled.div`
  @media (min-width: 375px){
    display:grid;
    grid-template-columns:1fr 1fr;
    text-align:center;
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
      houseContract: null,
      houseAdminContract: null,
      houseAdminAddress: null,
      houseAdminDeployed: null,
      baseOption: null,
      gasLimit: 6721975 // For ganache !
    };
  }

  async componentDidMount() {
    this.setState({
      ready: 'loading',
      houseContract: await axios({
        method: 'get',
        url: `http://localhost:8080/api/contract/house`
      }).then(response => {
        return response.data;
      }),
      houseAdminContract: await axios({
        method: 'get',
        url: `http://localhost:8080/api/contract/houseAdmin`
      }).then(response => {
        return response.data;
      }),
      houseAdminAddress: await axios({
        method: 'get',
        url: `http://localhost:8080/api/address/houseAdmin`
      }).then(response => {
        return response.data;
      })
    });

    this.setState({
      houseAdminDeployed: web3.eth.contract(this.state.houseAdminContract['abi'])
        .at(this.state.houseAdminAddress),
      baseOption: {
        gas: this.state.gasLimit,
        gasPrice: await new Promise((resolve, reject) => {
          web3.eth.getGasPrice((error, _gasPrice) => {
            if (error) {
              reject(error);
            }
            resolve(_gasPrice);
          })
        })
      }
    });

    const {houseContract, houseAdminDeployed, baseOption} = this.state;

    const addresses = await new Promise((resolve, reject) => {
      houseAdminDeployed.getAllHouses(baseOption, (error, addresses) => {
        if (error) {
          reject(error);
        }
        resolve(addresses);
      })
    });

    const houseContractABI = web3.eth.contract(houseContract['abi']);

    const getHouseInfo = async (_houseAddress) => {
      const houseContractDeployed = houseContractABI.at(_houseAddress);
      return {
        address: _houseAddress,
        owner: await new Promise((resolve, reject) => {
          houseContractDeployed.getOwner.call((error, _owner) => {
            if (error) {
              reject(error);
            }
            resolve(_owner);
          })
        }),
        location: await new Promise((resolve, reject) => {
          houseContractDeployed.getLocation.call((error, _location) => {
            if (error) {
              reject(error);
            }
            resolve(_location);
          })
        }),
        bedrooms: await new Promise((resolve, reject) => {
          houseContractDeployed.getBedrooms.call((error, _bedrooms) => {
            if (error) {
              reject(error);
            }
            resolve(_bedrooms.toNumber());
          })
        }),
        bathrooms: await new Promise((resolve, reject) => {
          houseContractDeployed.getBathrooms.call((error, _bathrooms) => {
            if (error) {
              reject(error);
            }
            resolve(_bathrooms.toNumber());
          })
        }),
        area: await new Promise((resolve, reject) => {
          houseContractDeployed.getArea.call((error, _area) => {
            if (error) {
              reject(error);
            }
            resolve(_area.toNumber());
          })
        }),
        price: await new Promise((resolve, reject) => {
          houseContractDeployed.getPrice.call((error, _price) => {
            if (error) {
              reject(error);
            }
            resolve(_price.toNumber());
          })
        }),
        status: await new Promise((resolve, reject) => {
          houseContractDeployed.getState.call((error, _state) => {
            if (error) {
              reject(error);
            }
            resolve(_state);
          })
        })
      }
    };

    const getAllHouseInfo = async (_addresses) => {
      return Promise.all(_addresses.map(_address => {
          return getHouseInfo(_address)
        }
      ));
    };

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
    const {houses, ready, location} = this.state;
    const filteredHouses = houses.filter(house => {
      return house.location.toLowerCase().indexOf(location.toLowerCase()) !== -1;
    });

    return (
      <div>
        <Navbar/>
        <List>
          <div className="listgroup">
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
                    <option value="3"> Luxury Hamptons Home</option>
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
                  <button className='propt_btn'>Search Properties</button>
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
                {filteredHouses.map(house => (
                  <div key={house.address}>
                    <Link to={`/house/${house.address}`}>
                      <ListItems image={`http://localhost:8080/public/images/${house.address}.jpg`}>
                        <h2>Price: {house.price} $</h2>
                        <Info>
                          <h4>Location: {house.location}</h4>
                          <h4>
                            {web3.eth.defaultAccount === house.owner ? 'OWNED' :
                              <button type="submit" className='buy_btn'>Buy Now !</button>
                            }
                          </h4>
                        </Info>
                        <Info>
                          <h6>Bedrooms: {house.bedrooms} bedroom(s)</h6>
                          <h6>Bathrooms: {house.bathrooms} bathroom(s)</h6>
                          <h6>Area: {house.area} square meters</h6>
                          <h6>Status: {house.status ? 'In Active' : 'Not Active'}</h6>
                        </Info>
                      </ListItems>
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
