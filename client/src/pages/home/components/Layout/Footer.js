import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './Footer.css';

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <span className="copyright">&copy; 2018-</span>
        <span className="author">
          made by Hanna with ❤ for{' '}
          <Link to="/dashboard">
            <span role="img" aria-label="baseball icon">
              ⚾
            </span>
          </Link>
        </span>
      </footer>
    );
  }
}
