import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Header.css';

export default class Header extends Component {
  render() {
    return (
      <header>
        <div className="header-wrapper">
          <h1>第100回全国高等学校野球選手権記念大会</h1>
          <ul className="nav">
            <li>
              <Link to='/dashboard'>Dashboard</Link>
            </li>
          </ul>
        </div>
      </header>
    );
  }
}
