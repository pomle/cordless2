import React, { Component } from 'react';

import './Splash.css';

export class Splash extends Component {
  render() {
    return (
      <div className="Splash">
        {this.props.children}
      </div>
    );
  }
}
