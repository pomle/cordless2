import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import {Authorize} from 'views/Authorize';
import {Player} from 'views/Player';

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route path="*" render={route => {
            return <Authorize route={route} player={Player}/>;
          }}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
