import React, { Component } from 'react';

import {createAuthorizationURL} from 'vendor/Spotify';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <a href={createAuthorizationURL()}>Authorize</a>
      </div>
    );
  }
}

export default App;
