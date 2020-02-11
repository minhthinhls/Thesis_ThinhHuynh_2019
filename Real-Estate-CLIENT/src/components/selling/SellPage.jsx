import React, {Component, Fragment} from 'react'
import styled from 'styled-components';
import axios from 'axios';
import Navbar from '../NavBar';
import Footer from '../Footer';

const SellPageStyle = styled.div`
  width: 90%;
  margin: 0px auto;
  padding-top: 60px;
  .sellHead {
    text-align: center;
    background-color: #293064;
    color: #b7c2f1;
    border-radius: 0.5em;
    h3, h4 {
      padding: 5px;
    }
  }
`;

const SellGroup = styled.div`
  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }
  .sellLeft {
    text-align: center;
    img {
      width: 100%;
      border-radius: 1em;
    }
  }
  .sellRight {
    display: block;
    background-color: #126894;
    text-align: center;
    border-radius: 0.5em;
    @media (min-width: 1440px) {
      height: fit-content;
      margin: auto 0px;
    }
    form {
      padding: 10px;
      @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        height: fit-content;
        align-items: center;
      }
    }
    .formInput {
      margin: 10px 0;
      display: block;
    }
    input {
      width: 90%;
      height: 35px;
      border-radius: 0.1em;
    }
    select {
      width: 80%;
    }
    .info {
      display: block;
      .Area {
        width: 80%;
      }
      @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
      }
    }
    .item {
      margin: 10px 0;
    }
    textarea {
      width: 90%;
    }
    .btn {
      text-align: center;
    }
    button {
      height: 45px;
      width: 192px;
      border: 0;
      border-radius: 0.5em;
      font-size: larger;
      padding: -23px;
      background-color: #031249;
      color: #b7c2f1;
    }
    label {
      display: block;
    }
  }
`;

class SellPage extends Component {
  constructor() {
    super();
    this.state = {
      Name: "",
      Email: "@gmail.com",
      Phone: "",
      Address: "",
      Type: "",
      Bedrooms: 0,
      Bathrooms: 0,
      Area: 0,
      Price: 0,
      DateListed: null,
      Summary: null,
      Images: null,
      houseAdminContract: null,
      houseAdminDeployed: null,
      baseOption: null,
      gasLimit: 6721975 // For ganache !
    };
  }

  async componentDidMount() {
    this.setState({
      houseAdminContract: await axios({
        method: 'get',
        url: `http://localhost:8080/api/contract/houseAdmin`
      }).then(response => {
        return response.data;
      })
    });

    this.setState({
      houseAdminDeployed: web3.eth.contract(this.state.houseAdminContract['abi'])
        .at(this.state.houseAdminContract['networks'][web3.version.network].address),
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

  }

  async sellingHouse(event) {
    event.preventDefault();
    const {houseAdminDeployed, baseOption} = this.state;
    const formData = new FormData();
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    try {
      const args = Object.values(this.state).slice(0, 9);
      if (this.state.Images == null) {
        throw new ReferenceError("All value must be input before sending form !");
      }
      houseAdminDeployed.sellHouse
        .call(...args, (error, address) => {
          if (!error) {
            formData.append('Images', this.state.Images, address);
            axios.post("http://localhost:8080/api/upload", formData, config)
              .then(response => {
                console.log(response, "The file is successfully uploaded !");
              })
              .catch(error => {
                console.log("Please choose image file to upload !", error);
              });
          }
        });
      houseAdminDeployed.sellHouse(...args, {
        ...baseOption,
        from: web3.eth.defaultAccount
      }, (error, hash) => {
        if (!error) {
          console.log("Transaction Hash:", hash);
        }
      });

    } catch (Exception) {
      console.log(Exception);
    }

  }

  inputName(event) {
    this.setState({
      Name: event.target.value
    })
  }

  inputEmail(event) {
    this.setState({
      Email: event.target.value
    })
  }

  inputPhone(event) {
    this.setState({
      Phone: event.target.value
    })
  }

  inputAddress(event) {
    this.setState({
      Address: event.target.value
    })
  }

  inputArea(event) {
    this.setState({
      Area: Number(event.target.value)
    })
  }

  inputType(event) {
    this.setState({
      Type: event.target.value
    })
  }

  inputBedrooms(event) {
    this.setState({
      Bedrooms: event.target.value
    })
  }

  inputBathrooms(event) {
    this.setState({
      Bathrooms: event.target.value
    })
  }

  inputDate(event) {
    this.setState({
      DateListed: event.target.value
    })
  }

  inputPrice(event) {
    this.setState({
      Price: Number(event.target.value)
    })
  }

  inputSummary(event) {
    this.setState({
      Summary: event.target.value
    })
  }

  inputImages(event) {
    this.setState({
      Images: event.target.files[0]
    })
  }

  render() {
    return (
      <Fragment>
        <Navbar/>
        <SellPageStyle>
          <div className="sellHead">
            <h3>Want to sell your home?</h3>
            <h4>Lets take that burden off you, just fill the form below and we will contact you</h4>
          </div>
          <SellGroup>
            <div className="sellLeft">
              <img src={require('../../../assets/pexels-photo-955793.jpeg')} alt="sellPage"/>
            </div>
            <div className="sellRight">
              <form onSubmit={this.sellingHouse.bind(this)}>

                <div className="formInput">
                  <label htmlFor="Name">Name:</label>
                  <input type="text" name="Name" onChange={this.inputName.bind(this)}/>
                </div>

                <div className="formInput">
                  <label htmlFor="Email">Email:</label>
                  <input type="email" name="Email" onChange={this.inputEmail.bind(this)}/>
                </div>

                <div className="formInput">
                  <label htmlFor="Phone">Phone:</label>
                  <input type="number" name="Phone" onChange={this.inputPhone.bind(this)}/>
                </div>

                <div className="formInput">
                  <label htmlFor="Address">Address:</label>
                  <input type="text" name="Address" onChange={this.inputAddress.bind(this)}/>
                </div>

                <div className="info formInput">
                  <div className="item">
                    <label htmlFor="Area">Area(m^2):</label>
                    <input className='Area' type="text" name="area" onChange={this.inputArea.bind(this)}/>
                  </div>
                  <div className="item">
                    <label htmlFor="Type">Type</label>
                    <select name="Type" onChange={this.inputType.bind(this)}>
                      <option data-display="Type of property">Please Choose</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Bungalow">Bungalow</option>
                      <option value="Condominium">Condominium</option>
                      <option value="Mobile Home">Mobile Home</option>
                      <option value="Tree House">Tree House</option>
                      <option value="Villa">Villa</option>
                    </select>
                  </div>
                  <div className="bed item">
                    <label htmlFor="Bedroom">Bedroom(s):</label>
                    <select name="Bedroom" onChange={this.inputBedrooms.bind(this)}>
                      <option data-display="Bedroom">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
                  <div className="bath item">
                    <label htmlFor="Bedroom">Bathroom(s):</label>
                    <select name="Bathroom" onChange={this.inputBathrooms.bind(this)}>
                      <option data-display="Bathroom">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
                </div>

                <div className="formInput">
                  <label htmlFor="Date">Date:</label>
                  <input type="date" name="Date" onChange={this.inputDate.bind(this)}/>
                </div>

                <div className="formInput">
                  <label htmlFor="Price">Asking Price($):</label>
                  <input type="text" name="Price" onChange={this.inputPrice.bind(this)}/>
                </div>

                <div className="formInput">
                  <label htmlFor="Summary">Summary:</label>
                  <textarea name="Summary" cols="30" rows="10" onChange={this.inputSummary.bind(this)}/>
                </div>

                <div className="formInput">
                  <label htmlFor="Upload">Send us an image:</label>
                  <input type="file" name="Images" onChange={this.inputImages.bind(this)}/>
                </div>

                <div className='btn'>
                  <button type="submit">Submit</button>
                </div>
              </form>
            </div>
          </SellGroup>
        </SellPageStyle>
        <Footer/>
      </Fragment>
    )
  }
}

export default SellPage;
