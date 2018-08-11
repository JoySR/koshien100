import React, { Component } from 'react';
import Header from './Header';
// import Footer from './Footer';
import TimeTable from './TimeTable';
import MatchDay from './MatchDay';
// import Map from './Map';
import './Home.css';

class HomeComponent extends Component {
  constructor(props) {
    super(props);
  
    this.state = {};
  }

  onAsync = (func) => {
    return new Promise((resolve, reject) => {
      this.props.dispatch(func)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  render() {
    const {dates, currentDateId, dispatch, games, schools, prefectures} = this.props;
    return (
      <div className="Home-container">
        <Header />
        <div className="main">
          <TimeTable dispatch={dispatch} onAsync={this.onAsync} dates={dates} />
          <MatchDay games={games} schools={schools} prefectures={prefectures} onAsync={this.onAsync} currentDateId={currentDateId} />
          {/*<Map />*/}
        </div>
        {/*<Footer />*/}
      </div>
    )
  }
}

export default HomeComponent;
