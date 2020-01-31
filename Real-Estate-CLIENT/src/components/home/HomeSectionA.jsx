import React from 'react';
import styled from 'styled-components';
import HomeCardSectionA from './HomeCardSectionA';

const SectionA = styled.div`
  padding: 120px 0;
  h2 {
    text-align: center;
  }
`;

const HomeCardStyles = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, auto);
    max-width: 1400px;
    margin: 0px auto;
  }
  @media (min-width: 1024px) {
    width: 900px;
  }
  @media (min-width: 1440px) {
    width: 1200px;
  }
`;

const HomeSectionA = () => (
  <SectionA>
    <h2>Why We Are The Best</h2>
    <HomeCardStyles>
      <HomeCardSectionA image={require('../../../assets/buy.png')}>
        <h3>Buying or Selling Made Simple</h3>
        <p>
          Find every home on the market, get your
          home's value value, book showings and even make
          offers all here on our website.
        </p>
      </HomeCardSectionA>

      <HomeCardSectionA image={require('../../../assets/track.png')}>
        <h3>Track the Entire Process Online</h3>
        <p>
          Stay in loop with weekly updates and 24/7 access to timeline of
          all the details of your transaction and your moves
        </p>
      </HomeCardSectionA>

      <HomeCardSectionA image={require('../../../assets/moving.png')}>
        <h3>Your Very own Moving Concierge</h3>
        <p>
          Buy, Sell or Rent with us and get a moving concierge
          to coordinate everything from changing over your utilities,
          finding movers.
        </p>
      </HomeCardSectionA>

      <HomeCardSectionA image={require('../../../assets/recommend.png')}>
        <h3>Highly Recommended</h3>
        <p>
          Usage of the Internet is becoming more common due
          to rapid advancement of technology and power.
        </p>
      </HomeCardSectionA>

      <HomeCardSectionA image={require('../../../assets/tech.png')}>
        <h3>Technical Skills</h3>
        <p>
          Usage of the Internet is becoming more common due
          to rapid advancement of technology and power.
        </p>
      </HomeCardSectionA>

      <HomeCardSectionA image={require('../../../assets/positive.png')}>
        <h3>Positive Reviews</h3>
        <p>
          Usage of the Internet is becoming more common due
          to rapid advancement of technology and power.
        </p>
      </HomeCardSectionA>
    </HomeCardStyles>
  </SectionA>

);

export default HomeSectionA;
