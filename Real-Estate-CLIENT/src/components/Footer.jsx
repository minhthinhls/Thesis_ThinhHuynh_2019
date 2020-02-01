import React from 'react'
import styled from 'styled-components';

const Foot = styled.footer`
  padding-top: 120px;
  p {
    text-align: center;
  }
  .footerGrid {
    background-color: #00000cfa;
    height: 100%;
    text-align: center;
    padding: 10px;
    h4 {
      color: #126894;
    }
    p {
      color: #b7c2f1;
      margin: 0px;
    }
    @media (min-width: 768px) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      padding: 20px;
    }
    @media (min-width: 1024px) {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;
const Year = new Date().getFullYear();

const Footer = () => (
  <Foot>
    <div className="footerGrid">
      <div className="footer-about">
        <h4>About Us</h4>
        <p>
          We love what we do.
          Changing the Real estate industry with progression and passion.
        </p>
      </div>

      <div className="footer-news">
        <h4>Newsletter</h4>
        <p>Stay update with our latest</p>
      </div>

      <div className="footer-social">
        <h4>Follow Us</h4>
        <p>Let us be social</p>

      </div>
    </div>
    <p>
      &copy;{Year}, Thinh Huynh
    </p>
  </Foot>
);

export default Footer;
