import React, {Component} from 'react';

import './Footer.css';

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <span className="copyright">&copy; 2018-</span>
        <span className="author">
          made by Hanna with ❤ for{' '}
          <span role="img" aria-label="baseball icon">
            ⚾
          </span>
        </span>
      </footer>
    );
  }
}
