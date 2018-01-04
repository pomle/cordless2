import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'

import {Authorize} from 'views/Authorize';

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Authorize/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
