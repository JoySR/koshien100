import React, { Component } from 'react';
import md5 from 'js-md5';
import {login} from '../../../actions/userAction'
import {onAsync} from '../../../lib/api'

class LoginComponent extends Component {

  onChange = (item, event) => {
    this.setState({
      [item]: event.target.value
    })
  }

  onSubmit = () => {
    const {username, password} = this.state;
    onAsync(login({
      username,
      password: md5(password),
    })).then(() => {
      this.props.history.push('/home');
    })
  }

  render() {
    return (
      <div>
        <div className="login">
          <h3>Log in</h3>
          <ul>
            <li>
              <label>Username: </label>
              <input onChange={(event) => this.onChange('username', event)} />
            </li>
            <li>
              <label>Password: </label>
              <input onChange={(event) => this.onChange('password', event)} />
            </li>
          </ul>
          <button onClick={() => this.onSubmit('user')}>OK</button>
        </div>
      </div>
    )
  }
}

export default LoginComponent;
