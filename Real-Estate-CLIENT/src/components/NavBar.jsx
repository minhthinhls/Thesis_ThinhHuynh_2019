import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../../assets/logo-via-logohub.png';
import CheckBalancePopUp from './house/CheckBalancePopUp';
import UtilBar from './UtilBar';

const NavPanel = styled.div`
  a img {
    width: 200px;
    height: 30px;
    float: left;
    padding: 5px;
  }
  img {
    height: 40px;
    float: right;
    padding: 6px;
  }
  .collapse::after {
    content: "";
    clear: both;
    display: table;
  }
  .navLinks a {
    text-decoration: none;
    display: block;
    text-align: center;
    font-size: 15px;
    padding: 5px;
    background-color: #b7c2f1;
    color: #293064;
    animation: fadeInLeft 0.6s both;
    &:nth-child(even) {
      background: #293064;
      color: #b7c2f1;
    }
  }
  .rm-navLinks {
    display: none;
  }
  @media (min-width: 768px) {
    .nav_respond {
      display: none;
    }
  }
  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translate3d(-100%, 0, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
`;

const NavGroup = styled.nav`
  display: none;
  @media (min-width: 768px) {
    padding: 20px 0;
    text-align: center;
    display: grid;
    grid-template-columns: repeat(4, auto);
    align-items: center;
    justify-items: center;
    width: 100%;
  }
  a {
    font-weight: bolder;
    font-size: 18px;
    color: #293064;
  }
  button {
    display: block;
    margin: auto;
    height: 35px;
    width: 50%;
    background-color: MidNightBlue;
    color: #b7c2f1;
    border: 0;
    border-radius: 0.5em;
    font-size: inherit;
  }
  .logo2 {
    height: 40px;
  }
`;

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      condition: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      condition: !this.state.condition
    })
  }

  render() {
    return (
      <NavPanel>
        <UtilBar defaultAccount={web3.eth.defaultAccount}/>
        <NavGroup>
          <Link to="/"><img src={Logo} className='logo2' alt="logo"/></Link>
          <Link to="/listing">Listing</Link>
          <Link to="/contact">Contact Us</Link>
          <CheckBalancePopUp trigger={<button>Check Balance</button>}/>
        </NavGroup>
      </NavPanel>
    )
  }

}

export default NavBar;
