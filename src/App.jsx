import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'

import {createAuthorizationURL} from 'vendor/Spotify';

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <a href={createAuthorizationURL()}>Authorize</a>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
