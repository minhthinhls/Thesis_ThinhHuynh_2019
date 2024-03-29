import React, {Fragment} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from './components/home/HomePage';
import GlobalStyle from './components/GlobalStyle';
import ListHouse from './components/listing/ListHouse';
import HouseDetail from './components/house/HouseDetail';
import SellPage from './components/selling/SellPage';
import SignUpPage from './components/signing/SignUpPage';
import ContactPage from './components/contact/ContactPage';
import {ToastProvider} from 'react-toast-notifications';
import store from './redux/store/store';
import Navbar from './components/NavBar';
import Footer from './components/Footer';

const Routes = () => (
  <Provider store={store}>
    <ToastProvider autoDismissTimeout={Number(3000)}>
      <Router>
        <Fragment>
          <GlobalStyle/>
          <Navbar/>
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/listing" component={ListHouse}/>
            <Route exact path="/selling" component={SellPage}/>
            <Route exact path="/signing" component={SignUpPage}/>
            <Route exact path="/contact" component={ContactPage}/>
            <Route path="/house/:address" component={HouseDetail}/>
          </Switch>
          <Footer/>
        </Fragment>
      </Router>
    </ToastProvider>
  </Provider>
);

export default Routes;
