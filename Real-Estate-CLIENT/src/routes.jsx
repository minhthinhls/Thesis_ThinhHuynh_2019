import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import GlobalStyle from './components/GlobalStyle';
import Listing from './components/Listings/Listing';
import ListView from './components/Listings/ListView';
import Sellpage from './components/SellPage/Sellpage';
import SignupPage from './components/Signup_Login/SignupPage';
import Contact from './components/contact/Contact';

const Routes = () => (
  <Router>
    <Fragment>
      <GlobalStyle/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/Listings" component={Listing}/>
        <Route exact path="/Sellpage" component={Sellpage}/>
        <Route exact path="/sign" component={SignupPage}/>
        <Route exact path="/contact" component={Contact}/>
        <Route path="/ListView/:id" component={ListView}/>
      </Switch>
    </Fragment>
  </Router>
);

export default Routes;
