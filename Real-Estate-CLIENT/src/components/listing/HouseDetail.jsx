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
import RentalOption from '../payment/RentalOption';
import InstallmentOption from '../payment/InstallmentOption';
import OwnerRentalOption from '../owner/OwnerRentalOption';
import OwnerInstallmentOption from '../owner/OwnerInstallmentOption';
import HouseDetailPopUp from './HouseDetailPopUp';
import CheckBalancePopUp from './CheckBalancePopUp';

const ListStyle = styled.div`
  width: 90%;
  padding-top: 80px;
  margin: 0px auto;
  img {
    width: 100%;
  }
  .viewRight {
    text-align: justified;
    h3 {
      margin-top: auto;
      margin-bottom: auto;
    }
    h5 {
      background-color: #b7c2f1;
      padding: 20px;
    }
  }
  .btn {
    text-align: center;
    cursor: pointer;
  }
  .buy_btn {
    height: 45px;
    width: 192px;
    border: 0;
    border-radius: 1em;
    font-size: large;
    background-color: #ff3b00;
    color: #000000;
    cursor: pointer;
  }
  .cannot_buy {
    background-color: #bbbbbb;
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
  text-align: center;
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
      deployedHouse: null
    }
  }

  async componentDidMount() {
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
                  <Info>
                    <h2>Type: Apartment</h2>
                    <h3>Price: {web3.fromWei(houseInfo.price, 'ether').toNumber()} $</h3>
                  </Info>
                  <h5>Contact me via https://facebook.com/minhthinh.huynhle</h5>
                  <Info>
                    <CheckBalancePopUp button={<button className='buy_btn cannot_buy'>Check Balance !</button>}/>
                    <HouseDetailPopUp button={<button className='buy_btn cannot_buy'>Show House Info !</button>}
                                      position={"left top"} deployedHouse={deployedHouse} houseInfo={houseInfo}/>
                  </Info>
                  <h5>Owner of this house:
                    {is(houseInfo.owner) ? 'You' :
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
                  <Info>
                    {web3.eth.defaultAccount !== houseInfo.owner
                      ?
                      <Fragment>
                        <RentalOption deployedHouse={deployedHouse} houseInfo={houseInfo}/>
                        <InstallmentOption deployedHouse={deployedHouse} houseInfo={houseInfo}/>
                      </Fragment>
                      :
                      <Fragment>
                        <OwnerRentalOption deployedHouse={deployedHouse} houseInfo={houseInfo}/>
                        <OwnerInstallmentOption deployedHouse={deployedHouse} houseInfo={houseInfo}/>
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
                  </Info>
                  <Info>
                    {web3.eth.defaultAccount === houseInfo.owner
                      ?
                      <div className="btn">
                        <button type="submit" className='buy_btn cannot_buy'>OWNED !</button>
                      </div>
                      :
                      (houseInfo.buyable
                          ?
                          <div className="btn">
                            <form onSubmit={this.buyingHouse.bind(this)}>
                              <button type="submit" className='buy_btn'>Buy Now !</button>
                            </form>
                          </div>
                          :
                          <div className="btn">
                            <button className='buy_btn cannot_buy'>Cannot Buy Now !</button>
                          </div>
                      )
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
