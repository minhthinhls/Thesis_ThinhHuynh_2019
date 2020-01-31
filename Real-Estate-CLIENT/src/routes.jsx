import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from './components/home/HomePage';
import GlobalStyle from './components/GlobalStyle';
import ListHouse from './components/listing/ListHouse';
import HouseDetail from './components/listing/HouseDetail';
import SellPage from './components/selling/SellPage';
import SignUpPage from './components/signing/SignUpPage';
import ContactPage from './components/contact/ContactPage';

const Routes = () => (
  <Router>
    <Fragment>
      <GlobalStyle/>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/listing" component={ListHouse}/>
        <Route exact path="/selling" component={SellPage}/>
        <Route exact path="/signing" component={SignUpPage}/>
        <Route exact path="/contact" component={ContactPage}/>
        <Route path="/house/:id" component={HouseDetail}/>
      </Switch>
    </Fragment>
  </Router>
);

export default Routes;
