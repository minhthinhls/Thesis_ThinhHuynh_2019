import React, {Component} from 'react';
import Header from './Header';
import HomeSectionA from './HomeSectionA';
import HomeSectionB from './HomeSectionB';
import HomeSectionC from './HomeSectionC';
import HomeSectionD from './HomeSectionD';

class HomePage extends Component {
  render() {
    return (
      <div>
        <Header parent={this}/>
        <HomeSectionA/>
        <HomeSectionB/>
        <HomeSectionC/>
        <HomeSectionD/>
      </div>
    );
  }
}

export default HomePage;
