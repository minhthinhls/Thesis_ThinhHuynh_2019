import React from 'react';
import Popup from 'reactjs-popup';
import styled from 'styled-components';

const FormStyle = styled.div`
  .container {
    background-color: DodgerBlue;
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
      margin: auto;
      background-color: DarkOrange;
      color: DarkBlue;
    }
  }
`;

const PopUpForm = ({children, ...props}) => (
  <Popup modal {...props}>
    <FormStyle>
      <div className="container">
        <div className="form">
          {children}
        </div>
      </div>
    </FormStyle>
  </Popup>
);

const PopUp = ({children, ...props}) => (
  <Popup {...props}>
    <FormStyle>
      <div className="container">
        <div className="form">
          {children}
        </div>
      </div>
    </FormStyle>
  </Popup>
);

export {FormStyle, PopUpForm, PopUp};
