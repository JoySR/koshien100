import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import createRoutes from './routes';

class App extends Component {
  render() {
    const {store} = this.props;
    const Routes = createRoutes(store);
    return (
      <div className="App">
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
