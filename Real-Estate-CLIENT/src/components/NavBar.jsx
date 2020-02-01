import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Logo from '../../assets/logo-via-logohub.png';
import styled from 'styled-components';
import NavLogo from '../../assets/iconfinder_menu-alt_134216.png';

const Nav = styled.div`
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
    grid-template-columns: repeat(5, auto);
    align-items: center;
    justify-items: center;
    width: 100%;
  }
  a {
    font-weight: bolder;
    font-size: 18px;
    color: #293064;
  }
  a button {
    height: 35px;
    width: 116px;
    background-color: #031249;
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
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({
      condition: !this.state.condition
    })
  }

  render() {
    return (
      <Nav>
        <div className="nav_respond">
          <div className="collapse">
            <Link to="/">
              <img src={Logo} alt="logo"/>
            </Link>
            <img src={NavLogo} alt="NavIcon" onClick={this.handleClick}/>
          </div>
          <div className={this.state.condition ? "navLinks" : "rm-navLinks"}>
            <Link to="/">Home</Link>
            <Link to="/listing">Listing</Link>
            <Link to="/selling">Selling</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/signing">Sign In</Link>
          </div>
        </div>
        <NavGroup>
          <Link to="/"><img src={Logo} className='logo2' alt="logo"/></Link>
          <Link to="/listing">Listing</Link>
          <Link to="/selling">Selling</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/signing">
            <button>Sign In</button>
          </Link>
        </NavGroup>
      </Nav>
    )
  }

}

export default NavBar;
