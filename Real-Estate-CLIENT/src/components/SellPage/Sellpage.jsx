import React, {Component, Fragment} from 'react'
import styled from 'styled-components';
import axios from 'axios';
import Navbar from '../Navbar';
import Footer from '../Footer';

const SellpageStyle = styled.div`
  width:90%;
  margin:0px auto;
  padding-top:60px;
  .sellhead{
    text-align:center;
    background-color: #293064;
    color: #b7c2f1;
    border-radius: .5em;
    h3, h4{
      padding:5px;
    }
  }
`;

const SellGroup = styled.div`
  @media(min-width:1024px){
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }
  
  .sellLeft{
    text-align:center;
    img{
      width:100%;
      border-radius: 1em;
    }
  }
  
  .sellRight{
    display:block;
    background-color: #126894;
    text-align:center;
    border-radius:0.5em;
    @media(min-width:1440px){
      height:fit-content;
      margin:auto 0px;
    }
    form {
      padding: 10px;
      @media(min-width:768px){
        display:grid;
        grid-template-columns:1fr 1fr;
        height:fit-content;
        align-items: center;
      }
    }
    
    .formInput{
      margin:10px 0;
      display:block;
    }
    
    input {
      width: 90%;
      height: 35px;
      border-radius: 0.1em;
    }
    
    select{
      width:80%;
    }
    
    .info{
      display:block;
      .Area{
        width:80%;
      }
      @media(min-width:768px){
        display:grid;
        grid-template-columns:1fr 1fr;
      }
    }
    
    .item{
      margin:10px 0;
    }
    
    textarea{
      width:90%;
    }
    
    .btn{
      text-align:center;
    }
    
    button{
      height: 45px;
      width: 192px;
      border: 0;
      border-radius: 0.5em;
      font-size: larger;
      padding: -23px; 
      background-color: #031249;
      color: #b7c2f1;
    }
    
    label{
      display:block;
    }
  }
`;

class Sellpage extends Component {
  constructor() {
    super();
    this.state = {
      Name: null,
      Email: null,
      Phone: null,
      Address: null,
      Area: 0,
      Type: null,
      Bedrooms: null,
      Bathrooms: null,
      DateListed: null,
      Price: 0,
      Summary: null,
      Images: [{}]
    };
  }

  async sellingHouse(event) {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const houseAdminContract = await axios({
      method: 'get',
      url: `http://localhost:8080/api/contract/houseAdmin`
    }).then(response => {
      // console.log(response.data);
      return response.data;
    });

    const houseAdminAddress = await axios({
      method: 'get',
      url: `http://localhost:8080/api/address/houseAdmin`
    }).then(response => {
      // console.log(response.data);
      return response.data;
    });

    try {
      const deployedContract = await new web3.eth.Contract(houseAdminContract['abi'], houseAdminAddress);

      await deployedContract.methods.sellHouse(this.state.Name, this.state.Area, this.state.Price).call({
        from: accounts[0],
        gas: '2000000'
      }).then(houseAddress => {
        console.log(
          `House's Deployed at: ${houseAddress}`
        );
      });

    } catch (Exception) {
      // console.log(Exception);
      // alert("Please input Name, Area, Price !");
    }

  }

  async buyingHouse(event) {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const houseAdminABI = await axios({
      method: 'get',
      url: `http://localhost:8080/api/contract/houseAdmin`
    }).then(response => {
      console.log(response.data);
      return response.data;
    });

    const houseAdminAddress = await axios({
      method: 'get',
      url: `http://localhost:8080/api/address/houseAdmin`
    }).then(response => {
      console.log(response.data);
      return response.data;
    });

    try {
      const deployedContract = await new web3.eth.Contract(houseAdminABI['abi']).deploy({
        data: '0x' + houseAdminABI['evm']['bytecode'].object,
        arguments: [accounts[0], this.state.Name, this.state.Area, this.state.Price]
      }).send({
        from: accounts[0],
        gas: '2000000',
        value: web3.utils.toWei(1, 'ether')
      }).then((deployedContract) => {
        console.log(
          `Contract deployed at address: ${deployedContract.options.address}`
        );
        return deployedContract;
      });

      await deployedContract.methods.getOwner().call({
        from: accounts[0]
      }).then(owner => {
        console.log(
          `House's Owner: ${owner}`
        );
      });

    } catch (Exception) {
      // console.log(Exception);
      // alert("Please input Name, Area, Price !");
    }

  }

  async deployHouseContract(event) {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const compiledContract = await axios({
      method: 'get',
      url: `http://localhost:8080/api/contract/house`
    }).then(response => {
      return response.data;
    });

    try {
      const deployedContract = await new web3.eth.Contract(compiledContract['abi']).deploy({
        data: '0x' + compiledContract['evm']['bytecode'].object,
        arguments: [accounts[0], this.state.Name, this.state.Area, this.state.Price]
      }).send({
        from: accounts[0],
        gas: '2000000'
      }).then((deployedContract) => {
        console.log(
          `Contract deployed at address: ${deployedContract.options.address}`
        );
        return deployedContract;
      });

      await deployedContract.methods.getOwner().call({
        from: accounts[0]
      }).then(owner => {
        console.log(
          `House's Owner: ${owner}`
        );
      });

    } catch (Exception) {
      console.log(Exception);
      alert("Please input Name, Area, Price !");
    }

  }

  submitHouseInfo(event) {
    event.preventDefault();
    axios({
      method: 'post',
      //url: `https://api.airtable.com/v0/apprAJrG1euRf2tmF/Listings`,
      url: `http://localhost:8080/api/info/house`,
      headers: {Authorization: `Bearer keyRMRWZ0xrBXA8Yv`, 'Content-Type': `application/json`},
      data: {
        fields: {
          Name: this.state.Name,
          Email: this.state.Email,
          Phone: this.state.Phone,
          Address: this.state.Address,
          Area: Number(this.state.Area),
          Type: this.state.Type,
          Bedrooms: Number(this.state.Bedrooms),
          Bathrooms: Number(this.state.Bathrooms),
          DateListed: this.state.DateListed,
          Price: Number(this.state.Price),
          Summary: this.state.Summary,
          Images: this.state.Images
        }
      }
    }).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
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
      Area: event.target.value
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
      Price: event.target.value
    })
  }

  inputSummary(event) {
    this.setState({
      Summary: event.target.value
    })
  }

  inputImages(event) {
    this.setState({
      Images: event.target.value
    })
  }

  render() {
    return (
      <Fragment>
        <Navbar/>
        <SellpageStyle>
          <div className="sellhead">
            <h3>Want to sell your home?</h3>
            <h4>Lets take that burden off you, just fill the form below and we will contact you</h4>
          </div>
          <SellGroup>
            <div className="sellLeft">
              <img src={require('../../../assets/pexels-photo-955793.jpeg')} alt="sellpage"/>
            </div>
            <div className="sellRight">
              {/*<form action="post" onSubmit={this.submitHouseInfo.bind(this)}>*/}
              <form action="get" onSubmit={this.sellingHouse.bind(this)}>

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
                  <input type="file" name="Upload" onChange={this.inputImages.bind(this)}/>
                </div>

                <div className='btn'>
                  <button type="submit">Submit</button>
                </div>
              </form>
            </div>
          </SellGroup>
        </SellpageStyle>
        <Footer/>
      </Fragment>
    )
  }
}

export default Sellpage;
