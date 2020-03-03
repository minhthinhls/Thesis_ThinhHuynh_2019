import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import Countdown from 'react-countdown';
import Navbar from '../NavBar';
import Footer from '../Footer';
import Loader from '../../../assets/loader.gif';
import {getHouseContract, getDeployedHouse, getHouseInfo} from '../../services/HouseService';
import {getHouseAddresses} from '../../services/HouseAdminService';
import {buyHouse} from '../../services/TransactionService';
import {toBigNumber, is} from '../../services/Utils';
import RentalOption from './payment/RentalOption';
import InstallmentOption from './payment/InstallmentOption';
import OwnerRentalOption from './owner/OwnerRentalOption';
import OwnerInstallmentOption from './owner/OwnerInstallmentOption';
import HouseDetailPopUp from './HouseDetailPopUp';
import CheckBalancePopUp from './CheckBalancePopUp';
import Toggle from '../utils/Toggle';

const HouseStyle = styled.div`
  width: 90%;
  padding-top: 80px;
  margin: 0px auto;
  img {
    width: 100%;
  }
  .viewRight {
    h3 {
      margin-top: auto;
      margin-bottom: auto;
    }
    h5 {
      background-color: #b7c2f1;
      padding: 20px;
    }
  }
  button {
    height: 45px;
    width: 192px;
    border: 0;
    border-radius: 1em;
    font-size: larger;
    background-color: #bbbbbb;
    color: black;
    cursor: pointer;
  }
  .bg-color_orange {
    background-color: #ff3b00;
  }
  .return_btn {
    background-color: MidnightBlue;
    color: white;
  }
  .Image {
    width: 25%;
    margin: 0px auto;
    position: relative;
    left: 37%;
  }
`;

const GridStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  text-align: center;
`;

const ResponsiveDetail = styled.div`
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
      deployedHouse: null
    };
    this.watchEvents = this.watchEvents.bind(this);
  }

  async componentDidMount() {
    this._isMounted = true;
    const {match: {params}} = this.props;
    this.setState({
      ready: 'loading',
      houseContract: await getHouseContract(),
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
    this.watchEvents();
  }

  watchEvents() {
    const {houseContract, houseAddress} = this.state;
    // TODO: trigger event when transaction is made, not when component renders
    this.state.deployedHouse.allEvents({}, {
      fromBlock: 'latest',
      toBlock: 'latest'
    }).watch((error, event) => {
      if (this._isMounted && !error) {
        console.log("Catch Events emitted by Solidity Contract:", event);
        getHouseInfo(houseContract['abi'], houseAddress).then((info) => {
          this.setState({
            houseInfo: info,
          });
        });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  async buyingHouse(event) {
    event.preventDefault();
    const {deployedHouse, houseInfo} = this.state;
    try {
      this.setState({
        ready: 'loading'
      });
      const transactionHash = await buyHouse(deployedHouse, houseInfo.price);
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
    const {houseInfo, deployedHouse, houseAddress, ready} = this.state;
    const image = `${process.env.PUBLIC_HTTP_PROVIDER}/images/${houseAddress}.jpg`;
    const isOwner = is(houseInfo.owner);
    return (
      <Fragment>
        <Navbar/>
        <HouseStyle>
          {ready === 'loading' ? (<img src={Loader} className="Image" alt="loader"/>) : ''}
          {ready === 'loaded' && (
            <Fragment>
              <ResponsiveDetail>
                <div className="viewLeft">
                  <img src={image || 'http://placehold.it/200'} alt="listing items"/>
                </div>
                <div className="viewRight">
                  <GridStyle>
                    <h3>Leave your interest here !</h3>
                    <Toggle checked={true} houseAddress={houseAddress}/>
                  </GridStyle>
                  <GridStyle>
                    <h2>Type: Apartment</h2>
                    <h3>Price: {web3.fromWei(houseInfo.price, 'ether').toNumber()} $</h3>
                  </GridStyle>
                  <h5>Contact me via https://facebook.com/minhthinh.huynhle</h5>
                  <GridStyle>
                    <CheckBalancePopUp trigger={<button>Check Balance !</button>}/>
                    <HouseDetailPopUp trigger={<button>Show House Info !</button>}
                                      position={"left top"} deployedHouse={deployedHouse} houseInfo={houseInfo}/>
                  </GridStyle>
                  <h5>Owner of this house:
                    {isOwner ? 'You' :
                      (Number(toBigNumber(houseInfo.owner)) === 0 ? 'None' : houseInfo.owner)}
                  </h5>
                  <h5>This house is rented by:
                    {is(houseInfo.renter) ? 'You' :
                      (Number(toBigNumber(houseInfo.renter)) === 0 ? 'None' : houseInfo.renter)}
                  </h5>
                  <h5>This house is paid by installment by:
                    {is(houseInfo.installmentBuyer) ? 'You' :
                      (Number(toBigNumber(houseInfo.installmentBuyer)) === 0 ? 'None' : houseInfo.installmentBuyer)}
                  </h5>
                  <GridStyle>
                    {isOwner ?
                      <Fragment>
                        <OwnerRentalOption deployedHouse={deployedHouse} houseInfo={houseInfo}/>
                        <OwnerInstallmentOption deployedHouse={deployedHouse} houseInfo={houseInfo}/>
                      </Fragment>
                      :
                      <Fragment>
                        <RentalOption deployedHouse={deployedHouse} houseInfo={houseInfo}/>
                        <InstallmentOption deployedHouse={deployedHouse} houseInfo={houseInfo}/>
                      </Fragment>
                    }
                    <h4>Renting Left-Time:
                      <Countdown date={new Date(Number(houseInfo.rentalPaymentDate.mul(1000)))}/>
                    </h4>
                    <h4>Installment Left-Time:
                      <Countdown date={new Date(Number(houseInfo.installmentPaymentDate.mul(1000)))}/>
                    </h4>
                    <h4>Renting Due-Time:
                      <Countdown date={new Date(Number(houseInfo.rentalDueDate.mul(1000)))}/>
                    </h4>
                    <h4>Installment Due-Time:
                      <Countdown date={new Date(Number(houseInfo.installmentDueDate.mul(1000)))}/>
                    </h4>
                  </GridStyle>
                  <GridStyle>
                    {isOwner ?
                      <button>OWNED !</button>
                      :
                      (houseInfo.buyable ?
                          <button className="bg-color_orange" onClick={this.buyingHouse.bind(this)}>Buy Now !</button>
                          :
                          <button>Cannot Buy Now !</button>
                      )
                    }
                    <Link to="/listing">
                      <button className="return_btn">Return</button>
                    </Link>
                  </GridStyle>
                </div>
              </ResponsiveDetail>
            </Fragment>
          )}
        </HouseStyle>
        <Footer/>
      </Fragment>
    );
  }
}

export default HouseDetail;
