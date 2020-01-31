import React from 'react';
import styled from 'styled-components';

const SectionD = styled.div`
  .info {
    width: 90%;
    text-align: center;
    margin: 0px auto;
  }
  h4 {
    font-weight: 800;
  }
  h6 {
    color: rgb(88, 88, 90);
    font-size: 14px;
  }
`;

const SectionDgroup = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, auto);
  }
  @media (min-width: 1440px) {
    display: grid;
    grid-template-columns: repeat(4, auto);
  }
`;

const Form = styled.div`
  padding-top: 35px;
  form {
    display: grid;
    grid-gap: 20px;
    .input {
      width: 85%;
      margin: 0px auto;
      height: 35px;
      padding: 10px;
      @media (min-width: 768px) {
        width: 500px;
        margin-top: 20px;
      }
    }
    .text {
      height: 170px;
    }
    button {
      height: 45px;
      width: 192px;
      border: 0;
      border-radius: 0.5em;
      font-size: larger;
      background-color: #031249;
      color: #b7c2f1;
      margin: auto;
    }
  }
`;

const HomeSectionD = () => (
  <SectionD>
    <SectionDgroup>
      <div className="info">
        <h4>Visit Our Office</h4>
        <h6>
          <p>Quarter 6, Linh Trung Ward, Thu Duc District, HCMC</p>
        </h6>
      </div>
      <div className="info">
        <h4>Let’s call us</h4>
        <h6>
          <p>Tel: (028) 37244270</p>
          <p>Fax: (028) 37244271</p>
          <p>Email: info@hcmiu.edu.vn</p>
        </h6>
      </div>
      <div className="info">
        <h4>Let’s Email Us</h4>
        <h6>
          <p>mainInfo@EtherRealEstate.com </p>
          <p>infoHelp@EtherRealEstate.com </p>
          <p>futureEvents@EtherRealEstate.com </p>
        </h6>
      </div>
      <div className="info">
        <h4>Customer Support</h4>
        <h6>
          <p>vipSupport@EtherRealEstate.com</p>
          <p>casualSupport@EtherRealEstate.com </p>
          <p>emergencySupport@EtherRealEstate.com </p>
        </h6>
      </div>
    </SectionDgroup>
    <Form>
      <form>
        <input className="input" type="text" name="fname" placeholder="Enter your name"/>
        <input className="input" name="email" placeholder="Enter email address" type="email" required/>
        <textarea className="input text" name="message" placeholder="Messege" required/>
        <button>Send Message</button>
      </form>
    </Form>

  </SectionD>

);

export default HomeSectionD;
