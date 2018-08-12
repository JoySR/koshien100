import React, {Component} from 'react';
import md5 from 'js-md5';
import {login} from '../../../actions/userAction';

class LoginComponent extends Component {
  onChange = (item, event) => {
    this.setState({
      [item]: event.target.value,
    });
  };

  onAsync = func => {
    return new Promise((resolve, reject) => {
      this.props
        .dispatch(func)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  };

  onSubmit = () => {
    const {username, password} = this.state;
    this.onAsync(
      login({
        username,
        password: md5(password),
      })
    ).then(() => {
      this.props.history.push('/home');
    });
  };

  render() {
    return (
      <div>
        <div className="login">
          <h3>Log in</h3>
          <ul>
            <li>
              <label>Username: </label>
              <input onChange={event => this.onChange('username', event)} />
            </li>
            <li>
              <label>Password: </label>
              <input
                type="password"
                onChange={event => this.onChange('password', event)}
              />
            </li>
          </ul>
          <button onClick={() => this.onSubmit('user')}>OK</button>
        </div>
      </div>
    );
  }
}

export default LoginComponent;
