import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Authorize } from 'layers/Authorize';
import { PlayerApplication } from 'layers/PlayerApplication';

import './App.css';

class App extends Component {
  render() {
    const { storage } = this.props;

    return (
      <BrowserRouter>
        <div className="App">
          <Authorize
            storage={storage}
            render={token => {
              return <PlayerApplication token={token} />;
            }}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
