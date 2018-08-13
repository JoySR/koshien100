import React, {Component} from 'react';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import TimeTable from './TimeTable';
import MatchDay from './MatchDay';
import Map from './Map';
import SchoolCard from './SchoolCard';
import Login from './Login';
import Register from './Register';

import './Home.css';

class HomeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSchool: undefined,
      shouldShowLoginModal: false,
      shouldShowRegisterModal: false,
    };
  }

  componentDidMount() {
    const {query = {}} = this.props;
    if (query['needLogin'] === '1') {
      this.setState({
        shouldShowLoginModal: true,
      });
    } else if (query['register'] === '1') {
      this.setState({
        shouldShowRegisterModal: true,
      });
    }
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

  onCancelModal = () => {
    this.setState(
      {
        shouldShowLoginModal: false,
        shouldShowRegisterModal: false,
      },
      () => {
        this.props.history.push('/');
      }
    );
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
    const {
      currentSchool,
      shouldShowLoginModal,
      shouldShowRegisterModal,
    } = this.state;
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
        <Footer />
        {shouldShowLoginModal && (
          <Login
            onAsync={this.onAsync}
            onLogin={() => {
              this.props.history.push('/dashboard');
            }}
            onClose={this.onCancelModal}
          />
        )}
        {shouldShowRegisterModal && (
          <Register
            onAsync={this.onAsync}
            onRegister={() => {
              this.props.history.push('/');
            }}
            onClose={this.onCancelModal}
          />
        )}
      </div>
    );
  }
}

export default HomeComponent;
