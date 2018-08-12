import React, {Component} from 'react';
import Header from './Header';
// import Footer from './Footer';
import TimeTable from './TimeTable';
import MatchDay from './MatchDay';
import Map from './Map';
import SchoolCard from './SchoolCard';

import './Home.css';

class HomeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSchool: undefined,
    };
  }

  onAsync = func => {
    return new Promise((resolve, reject) => {
      this.props
        .dispatch(func)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  };

  onShowSchool = schoolId => {
    const {schools} = this.props;

    const currentSchool = schools.filter(school => {
      return school.school_id === schoolId;
    })[0];

    this.setState({
      currentSchool,
    });
  };

  onCloseCard = () => {
    this.setState({
      currentSchool: null,
    });
  };

  render() {
    const {
      dates,
      currentDateId,
      dispatch,
      games,
      schools,
      prefectures,
    } = this.props;
    const {currentSchool} = this.state;
    return (
      <div className="Home-container">
        <Header />
        <div className="main">
          <TimeTable dispatch={dispatch} onAsync={this.onAsync} dates={dates} />
          <MatchDay
            games={games}
            schools={schools}
            prefectures={prefectures}
            onAsync={this.onAsync}
            currentDateId={currentDateId}
            onShowSchool={this.onShowSchool}
          />
          <Map
            schools={schools}
            games={games}
            prefectures={prefectures}
            onShowSchool={this.onShowSchool}
          />
          <SchoolCard
            onCloseCard={this.onCloseCard}
            prefectures={prefectures}
            school={currentSchool}
            games={games}
            schools={schools}
          />
        </div>
        {/*<Footer />*/}
      </div>
    );
  }
}

export default HomeComponent;
