import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Authorize } from 'views/Authorize';
import { PlayerUI } from 'views/PlayerUI';

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route
            path="*"
            render={route => {
              return (
                <Authorize
                  route={route}
                  render={token => {
                    return <PlayerUI token={token} />;
                  }}
                />
              );
            }}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
