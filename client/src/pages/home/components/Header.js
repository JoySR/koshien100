import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Header.css';
import {getToken} from '../../../lib/token'

export default class Header extends Component {
  render() {
    const token = getToken();
    return (
      <header>
        <div className="header-wrapper">
          <h1>第100回全国高等学校野球選手権記念大会</h1>
          <ul className="nav">
            <li>
              {
                token ?
                  <Link to='/dashboard'>Dashboard</Link> :
                  <Link to='/login'>Login</Link>
              }
            </li>
          </ul>
        </div>
      </header>
    );
  }
}
