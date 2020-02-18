import React from 'react';
import Popup from 'reactjs-popup';
import styled from "styled-components";

const FormStyle = styled.div`
  .container {
    display: block;
    background-color: #126894;
    border-radius: 0.5em;
    .form {
      display: grid;
      grid-template-columns: 1fr 1fr;
      height: fit-content;
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
      width: 90%;
      height: 35px;
      border-radius: 0.1em;
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

const PopUpForm = ({button, children}) => (
  <Popup modal trigger={button}>
    <FormStyle>
      <div className="container">
        <div className="form">
          {children}
        </div>
      </div>
    </FormStyle>
  </Popup>
);

const PopUp = ({button, position, children}) => (
  <Popup trigger={button} position={position}>
    <FormStyle>
      <div className="container">
        <div className="form">
          {children}
        </div>
      </div>
    </FormStyle>
  </Popup>
);

export default PopUpForm;
export {PopUp};
