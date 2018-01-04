import React, { Component } from 'react';

import {createAuthorizationURL} from 'vendor/Spotify';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <a href={createAuthorizationURL('a7cf3dcdfbd64bd5ac8d960caabbc890')}>Authorize</a>
      </div>
    );
  }
}

export default App;
