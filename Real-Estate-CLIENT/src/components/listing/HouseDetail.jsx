import React, {Fragment, Component} from 'react';
import styled from 'styled-components';
import Navbar from '../NavBar';
import Footer from '../Footer';
import {Link} from 'react-router-dom';
import Loader from '../../../assets/loader.gif';
import {getHouseContract, getDeployedHouse, getHouseInfo} from '../../services/HouseService';
import {getHouseAddresses} from '../../services/HouseAdminService';
import {getBaseOption} from '../../services/EthereumService';

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

class HouseDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      houseInfo: {},
      ready: 'initial',
      houseContract: null,
      houseAddress: null,
      deployedHouse: null,
      baseOption: null
    }
  }

  async componentDidMount() {
    const {match: {params}} = this.props;
    this.setState({
      ready: 'loading',
      houseContract: await getHouseContract(),
      baseOption: await getBaseOption(),
      houseAddress: params.address
    });

    const {houseContract, houseAddress} = this.state;

    this.setState({
      deployedHouse: await getDeployedHouse(houseContract['abi'], houseAddress),
      houseInfo: {
        ...(await getHouseInfo(houseContract['abi'], houseAddress)),
        id: (await getHouseAddresses()).indexOf(houseAddress)
      },
      ready: 'loaded'
    });
  }

  async buyingHouse(event) {
    event.preventDefault();
    const {houseInfo, deployedHouse, baseOption} = this.state;
    try {
      this.setState({
        ready: 'loading'
      });
      const transactionHash = await new Promise((resolve, reject) => {
        deployedHouse.buy({
          ...baseOption,
          from: web3.eth.defaultAccount,
          value: houseInfo.price // $price has BigNumber() type !
        }, (error, txHash) => {
          if (error) {
            reject(error);
          }
          resolve(txHash);
        })
      });
      console.log("Transaction succeed:", transactionHash);
      this.setState({
        houseInfo: {...this.state.houseInfo, owner: web3.eth.defaultAccount},
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
    const {houseInfo, houseAddress, ready} = this.state;
    return (
      <Fragment>
        <Navbar/>
        <ListStyle>
          {ready === 'loading' ? (<img src={Loader} className='Image' alt="loader"/>) : ''}
          {ready === 'loaded' && (
            <Fragment>
              <ListGroup>
                <div className="viewLeft">
                  <img src={`http://localhost:8080/public/images/${houseAddress}.jpg`} alt="listing items"/>
                </div>
                <div className="viewRight">
                  <h2>Type: Apartment</h2>
                  <h4>Price: {web3.fromWei(houseInfo.price, 'ether').toNumber()} $</h4>
                  <h5>Summary: House for renting</h5>
                  <Info>
                    <h6>Bedrooms: {houseInfo.bedrooms} bedroom(s)</h6>
                    <h6>Bathrooms: {houseInfo.bathrooms} bathroom(s)</h6>
                    <h6>Area: {houseInfo.area} square meters</h6>
                    <h6>Status: {houseInfo.status ? 'In Active' : 'Not Active'}</h6>
                  </Info>
                  <Info>
                    {web3.eth.defaultAccount === houseInfo.owner
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

export default HouseDetail;
