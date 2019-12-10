import React from 'react';
import styled from 'styled-components';

const SectionC = styled.div`
  padding:120px 0;
  @media(min-width:768px){
    display:grid;
    grid-template-columns:repeat(2,1fr);
    img{
      height:100%;
    }
  }
  
  .left{
    background-color: #00000cfa;
    padding:10px;
    h4{
      color: #126894;
      margin:0px;
      font-size: 25px;
    }
    .about{
      @media(min-width:768px){
        padding: 20px;
        width: 360px;
       margin:auto;
      }
      @media(min-width:1440px){
       margin:auto;
      }
    }
  }
  
  p{
    color:#b7c2f1;
  }
  .right{
    img{
      width:100%;
    }
  }
  @media(min-width:768px){
    display:grid;
    grid-template-columns:repeat(2,auto);
  }
`;

const HomeSectionC = () => (
  <SectionC>
    <div className="left">
      <div className="about">
        <h4>Why Choose Us</h4>
        <p>
          Our Estate Agency is committed to getting the best results for every client.
          Whether you are looking for an experienced agent to sell your home or a team of dedicated property managers,
          we can help you achieve your goals.
        </p>
      </div>

      <div className="about">
        <h4>Legal Notice</h4>
        <p>
          Please read the following terms carefully before using this Website.
          By using this Website you acknowledge and accept these terms and conditions.
          If you do not accept these terms and conditions, do not use this Website.
        </p>
      </div>

      <div className="about">
        <h4>Our Properties</h4>
        <p>
          Our Real Estate is a family owned and operated Real Estate Agency,
          offering the highest level of personal and professional service.
          At Our Real Estate our main focus is providing our clients and customers
          with the ultimate real estate experience.
          The Our Real Estate team strive to get the best possible result for our clients
          by tailoring to your individual needs and providing superior friendly, family orientated service.
        </p>
      </div>

    </div>
    <div className="right">
      <img src={require('../../assets/about-img.jpg')} alt="about image"/>
    </div>

  </SectionC>
);

export default HomeSectionC;
