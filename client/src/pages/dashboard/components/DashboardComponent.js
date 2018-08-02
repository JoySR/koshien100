import React, { Component } from 'react';
import AreaBoard from './AreaBoard'
import DateBoard from './DateBoard'
import GameBoard from './GameBoard'
import PrefectureBoard from './PrefectureBoard'
import SchoolBoard from './SchoolBoard'
import MainBoard from './MainBoard'

const SIDEBAR_ITEMS = ['Dashboard', 'Games', 'Dates', 'Schools', 'Prefectures', 'Areas'];

class DashboardComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentContent: 'Dashboard'
    };
  }

  onAsync = (func) => {
    return new Promise((resolve, reject) => {
      this.props.dispatch(func)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  renderSidebar = () => {
    return SIDEBAR_ITEMS.map(item => {
      return (
        <li className="nav-item" key={item} onClick={() => {this.setState({currentContent: item})}}>
          <a className="nav-link">
            {item}
          </a>
        </li>
      )
    })
  }

  renderMainContent = () => {
    const {currentContent} = this.state;
    const {areas, prefectures, dates, schools} = this.props;
    switch (currentContent) {
      case 'Dashboard':
      default:
        return <MainBoard />
      case 'Games':
        return <GameBoard onAsync={this.onAsync}/>;
      case 'Dates':
        return <DateBoard onAsync={this.onAsync} dates={dates} />;
      case 'Schools':
        return <SchoolBoard onAsync={this.onAsync} prefectures={prefectures} schools={schools}/>;
      case 'Prefectures':
        return <PrefectureBoard prefectures={prefectures} areas={areas} onAsync={this.onAsync}/>;
      case 'Areas':
        return <AreaBoard onAsync={this.onAsync} areas={areas} />
    }
  }

  render() {
    return (
      <div>
      <nav className="navbar navbar-dark bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Dashboard</a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap">
              <a className="nav-link" href="#">Log out</a>
            </li>
          </ul>
      </nav>
      <div className="container-fluid">
        <div className="row">
          <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
              <ul className="nav flex-column">
                {this.renderSidebar()}
              </ul>
            </div>
          </nav>
          {this.renderMainContent()}
        </div>
      </div>
      </div>
    )
  }
}

export default DashboardComponent;
