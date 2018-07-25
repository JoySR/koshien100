import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import TimeTable from './TimeTable';
import MatchDay from './MatchDay';
import Map from './Map';
import './Home.css';

class HomeComponent extends Component {
  constructor(props) {
    super(props);
  
    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <Header />
        <div className="main">
          <TimeTable />
          <MatchDay />
          <Map />
        </div>
        <Footer />
      </div>
    )
  }
}

export default HomeComponent;
