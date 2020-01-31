import React from 'react';
import styled from 'styled-components';

const Cards = styled.div`
  border-radius:0.4em;
  padding:10px;
  width: 90%;
  margin: 35px auto;
  box-shadow: -2px 7px 20px black;
  img{
    width:100%;
  }
`;

const HomeSectionBCard = ({children, image}) => {
  return (
    <Cards>
      <img src={image} alt="sectionA cards"/>
      <div>
        {children}
      </div>
    </Cards>
  )
};

export default HomeSectionBCard;
