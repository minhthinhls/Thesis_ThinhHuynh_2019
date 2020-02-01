import React, {Fragment, Component} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Navbar from '../NavBar';
import Footer from '../Footer';
import {Link} from 'react-router-dom';
import Loader from '../../../assets/loader.gif';

const ListStyle = styled.div`
  width: 90%;
  padding-top: 120px;
  margin: 0px auto;
  img {
    width: 100%;
  }
  .viewRight {
    text-align: justified;
    h5 {
      background-color: #b7c2f1;
      padding: 20px;
    }
  }
  .btn {
    text-align: center;
  }
  .buy_btn {
    height: 45px;
    width: 192px;
    border: 0;
    border-radius: 1em;
    font-size: large;
    background-color: #ff3b00;
    color: #000000;
  }
  input[type="button"] {
    height: 45px;
    width: 192px;
    border: 0;
    border-radius: 1em;
    font-size: larger;
    padding: -23px;
    background-color: #031249;
    color: #b7c2f1;
  }
  .Image {
    width: 25%;
    margin: 0px auto;
    position: relative;
    left: 37%;
  }
`;

const Info = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
`;

const ListGroup = styled.div`
  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
  }
`;

class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      house: {},
      ready: 'initial',
      houseContract: null,
      houseAddress: null,
      houseDeployed: null,
      houseAdminContract: null,
      houseAdminAddress: null,
      houseAdminDeployed: null,
      baseOption: null,
      gasLimit: 6721975 // For ganache !
    }
  }

  async componentDidMount() {
    const {match: {params}} = this.props;
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
      }),
      houseAddress: params.id
    });

    this.setState({
      houseDeployed: web3.eth.contract(this.state.houseContract['abi'])
        .at(this.state.houseAddress),
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

    const {houseDeployed, houseAddress, houseAdminDeployed} = this.state;

    const getHouseInfo = async () => {
      return {
        address: houseAddress,
        id: await new Promise((resolve, reject) => {
          houseAdminDeployed.getAllHouses.call((error, _owner) => {
            if (error) {
              reject(error);
            }
            resolve(_owner.indexOf(houseAddress));
          })
        }),
        owner: await new Promise((resolve, reject) => {
          houseDeployed.getOwner.call((error, _owner) => {
            if (error) {
              reject(error);
            }
            resolve(_owner);
          })
        }),
        location: await new Promise((resolve, reject) => {
          houseDeployed.getLocation.call((error, _location) => {
            if (error) {
              reject(error);
            }
            resolve(_location);
          })
        }),
        bedrooms: await new Promise((resolve, reject) => {
          houseDeployed.getBedrooms.call((error, _bedrooms) => {
            if (error) {
              reject(error);
            }
            resolve(_bedrooms.toNumber());
          })
        }),
        bathrooms: await new Promise((resolve, reject) => {
          houseDeployed.getBathrooms.call((error, _bathrooms) => {
            if (error) {
              reject(error);
            }
            resolve(_bathrooms.toNumber());
          })
        }),
        area: await new Promise((resolve, reject) => {
          houseDeployed.getArea.call((error, _area) => {
            if (error) {
              reject(error);
            }
            resolve(_area.toNumber());
          })
        }),
        price: await new Promise((resolve, reject) => {
          houseDeployed.getPrice.call((error, _price) => {
            if (error) {
              reject(error);
            }
            resolve(_price.toNumber());
          })
        }),
        status: await new Promise((resolve, reject) => {
          houseDeployed.getState.call((error, _state) => {
            if (error) {
              reject(error);
            }
            resolve(_state);
          })
        })
      }
    };

    this.setState({
      house: await getHouseInfo(),
      ready: 'loaded'
    });

  }

  async buyingHouse(event) {
    event.preventDefault();
    const {house, houseAdminDeployed, baseOption} = this.state;
    try {
      this.setState({
        ready: 'loading'
      });
      const transactionHash = await new Promise((resolve, reject) => {
        houseAdminDeployed.buyHouse(house.id, {
          ...baseOption,
          from: web3.eth.defaultAccount,
          value: web3.toWei(house.price, 'ether')
        }, (error, txHash) => {
          if (error) {
            reject(error);
          }
          resolve(txHash);
        })
      });
      console.log("Transaction succeed:", transactionHash);
      this.setState({
        house: {...this.state.house, owner: web3.eth.defaultAccount},
        ready: 'loaded'
      });
    } catch (Exception) {
      console.log(Exception);
      this.setState({
        ready: 'loaded'
      });
    }
  }

  render() {
    const {house, ready} = this.state;
    return (
      <Fragment>
        <Navbar/>
        <ListStyle>
          {ready === 'loading' ? (<img src={Loader} className='Image' alt="loader"/>) : ''}
          {ready === 'loaded' && (
            <Fragment>
              <ListGroup>
                <div className="viewLeft">
                  <img src={`http://localhost:8080/public/images/${house.address}.jpg`} alt="listing items"/>
                </div>
                <div className="viewRight">
                  <h2>Type: Apartment</h2>
                  <h4>Price: {house.price} $</h4>
                  <h5>Summary: House for renting</h5>
                  <Info>
                    <h6>Bedrooms: {house.bedrooms} bedroom(s)</h6>
                    <h6>Bathrooms: {house.bathrooms} bathroom(s)</h6>
                    <h6>Area: {house.area} square meters</h6>
                    <h6>Status: {house.status ? 'In Active' : 'Not Active'}</h6>
                  </Info>
                  <Info>
                    {web3.eth.defaultAccount === house.owner
                      ?
                      <div className="btn">
                        <button type="submit" className='buy_btn'>OWNED !</button>
                      </div>
                      :
                      <div className="btn">
                        <form onSubmit={this.buyingHouse.bind(this)}>
                          <button type="submit" className='buy_btn'>Buy Now !</button>
                        </form>
                      </div>
                    }
                    <div className="btn">
                      <Link to="/listing">
                        <input type="button" value="Return"/>
                      </Link>
                    </div>
                  </Info>
                </div>
              </ListGroup>
            </Fragment>
          )}
        </ListStyle>
        <Footer/>
      </Fragment>
    );
  }
}

export default ListView;
