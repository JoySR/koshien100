import React, { Component } from 'react';

class LoginComponent extends Component {
  
  _onClickGoToHome() {
    this.props.history.push('/home');
  }

  render() {
    return (
      <div>
        <p>This is login page.</p>
        <button onClick={() => {this._onClickGoToHome()}}>跳转到home页面</button>
      </div>
    )
  }
}

export default LoginComponent;
