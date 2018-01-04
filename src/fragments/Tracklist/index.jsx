import React, { Component } from 'react';

import './Tracklist.css';

export class Tracklist extends Component {
  render() {
    return (
      <div className="Tracklist">
        {this.props.children}
      </div>
    );
  }
}
