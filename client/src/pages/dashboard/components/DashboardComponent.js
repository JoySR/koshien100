import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AreaBoard from './AreaBoard';
import DateBoard from './DateBoard';
import GameBoard from './GameBoard';
import PrefectureBoard from './PrefectureBoard';
import SchoolBoard from './SchoolBoard';
import MainBoard from './MainBoard';
import {logout} from '../../../actions/userAction';
import {getToken} from '../../../lib/token';

import './DashboardComponent.css';

const SIDEBAR_ITEMS = [
  'Dashboard',
  'Games',
  'Dates',
  'Schools',
  'Prefectures',
  'Areas',
];

class DashboardComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentContent: 'Dashboard',
    };
  }

  componentWillMount() {
    const token = getToken();
    if (!token) {
      this.props.history.push('/?needLogin=1');
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

  logout = () => {
    const token = getToken();
    this.onAsync(
      logout({
        token,
      })
    ).then(() => {
      this.props.history.push('/');
    });
  };

  renderSidebar = () => {
    return SIDEBAR_ITEMS.map(item => {
      return (
        <li
          className="nav-item"
          key={item}
          onClick={() => {
            this.setState({currentContent: item});
          }}
        >
          <a className="nav-link">{item}</a>
        </li>
      );
    });
  };

  renderMainContent = () => {
    const {currentContent} = this.state;
    const {areas, prefectures, dates, schools, games} = this.props;
    switch (currentContent) {
      case 'Dashboard':
      default:
        return <MainBoard />;
      case 'Games':
        return (
          <GameBoard
            onAsync={this.onAsync}
            games={games}
            schools={schools}
            prefectures={prefectures}
            dates={dates}
          />
        );
      case 'Dates':
        return <DateBoard onAsync={this.onAsync} dates={dates} />;
      case 'Schools':
        return (
          <SchoolBoard
            onAsync={this.onAsync}
            prefectures={prefectures}
            schools={schools}
          />
        );
      case 'Prefectures':
        return (
          <PrefectureBoard
            prefectures={prefectures}
            areas={areas}
            onAsync={this.onAsync}
          />
        );
      case 'Areas':
        return <AreaBoard onAsync={this.onAsync} areas={areas} />;
    }
  };

  render() {
    return (
      <div className="Dashboard-container">
        <nav className="Dashboard-header navbar flex-md-nowrap p-0">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0">Dashboard</a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-flex">
              <Link className="nav-link pr-3" to="/">
                Home
              </Link>
              <a className="nav-link" onClick={this.logout}>
                Log out
              </a>
            </li>
          </ul>
        </nav>
        <div className="container-fluid">
          <div className="row">
            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
              <div className="sidebar-sticky">
                <ul className="nav flex-column">{this.renderSidebar()}</ul>
              </div>
            </nav>
            {this.renderMainContent()}
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardComponent;
