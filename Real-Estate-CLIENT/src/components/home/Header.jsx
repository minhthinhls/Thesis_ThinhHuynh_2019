import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import styled from 'styled-components';
import HomeImage from '../../../assets/home.jpeg';

const HeaderStyle = styled.header`
  background: url(${HomeImage}) no-repeat center center/cover;
  height: 801px;
  .header_container {
    width: 300px;
    margin: 0px auto;
    color: white;
    background-color: rgba(3, 18, 73, 0.7);
    border-radius: 0.4em;
    padding: 30px;
    position: relative;
    top: 55px;
    text-align: center;
    animation: intro 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    @media (min-width: 375px) {
      width: 90%;
      top: i95px !important;
    }
    @media (min-width: 425px) {
      top: 100px;
      width: 90%;
    }
    @media (min-width: 768px) {
      width: 709px;
      top: 185px;
      background-color: rgba(3, 18, 73, 0.5);
    }
    form {
      margin-top: 20px;
      @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        justify-items: center;
      }
    }
    h1 {
      font-size: 26px;
    }
    h3 {
      font-size: 15px;
    }
    .buttons button {
      background-color: #c1bcbc;
      display: inline;
      padding: 2px;
      border: 0;
      height: 34px;
      padding: 10px;
    }
    .buttons button:hover {
      background-color: rgba(3, 18, 73, 1);
      color: white;
      transition: 0.5s;
    }
    input {
      border-radius: 0.4em;
      width: 239px;
      height: 30px;
      border: 0;
      margin-top: 20px;
      margin-bottom: 20px;
      padding: 10px;
      @media (min-width: 768px) {
        width: 315px;
      }
    }
    select {
      border-radius: 0.4em;
      width: 239px;
      height: 30px;
      border: 0;
      margin-top: 20px;
      margin-bottom: 20px;
      @media (min-width: 768px) {
        width: 315px;
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
  }
  @keyframes intro {
    0% {
      transform: scale(0.2) translateY(-50px);
      opacity: 0;
    }
  }
`;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }

  componentDidMount() {
    const {location: {search}} = this.props.parent.props;
    if (search) {
      this.setState({
        search
      });
    }
  }

  render() {
    const {search} = this.state;
    return (search ?
        <Redirect to={`/listing${search}`}/>
        :
        <Fragment>
          <HeaderStyle>
            <div className="header_container">
              <h1>We manage your Transition, not just the Transaction</h1>
              <h3>buy or sell a home and manage the moving process all in one place</h3>
              <div className="buttons">
                <button>Find Home</button>
                <button>Sell Home</button>
                <button>See home estimate</button>
              </div>
              <form>
                <input type="number" id="priceUpperRange" name="priceUpperRange"
                       placeholder={`Upper Price (${this.props.unitCurrency})`}/>
                <div className="Location">
                  <input type="search" id="location" name="location" placeholder='Location'/>
                </div>
                <input type="number" id="priceLowerRange" name="priceLowerRange"
                       placeholder={`Lower Price (${this.props.unitCurrency})`}/>
                <div className="Status">
                  <select name="status" id="status">
                    <option value={`null`}>Status</option>
                    <option value={true}>Active</option>
                    <option value={false}>Not Active</option>
                  </select>
                </div>
                <input type="text" id="areaUpperRange" name="areaUpperRange"
                       placeholder={`Upper Area (${this.props.unitArea})`}/>
                <div className="Option">
                  <select name="option" id="option">
                    <option value="null">Option</option>
                    <option value="buyable">Buy</option>
                    <option value="inProcess">Pay by Installment</option>
                  </select>
                </div>
                <input type="text" id="areaLowerRange" name="areaLowerRange"
                       placeholder={`Lower Area (${this.props.unitArea})`}/>
                <div style={{display: 'none'}}>
                  <input type="text" id="unitCurrency" name="unitCurrency" defaultValue={this.props.unitCurrency}/>
                  <input type="text" id="unitArea" name="unitArea" defaultValue={this.props.unitArea}/>
                </div>
                <div className="button">
                  <button className='prop_btn'>Search Properties</button>
                </div>
              </form>
            </div>
          </HeaderStyle>
        </Fragment>
    );
  }
}

const mapStateToProps = function (store) {
  return {
    unitCurrency: store.unitCurrency,
    unitArea: store.unitArea
  };
};

export default connect(
  mapStateToProps, /* mapStateToProps */
  null /* mapDispatchToProps */
)(Header);
