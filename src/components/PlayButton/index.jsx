import React, { Component } from 'react';

import './PlayButton.css';

export class PlayButton extends Component {
  render() {
    return (
      <button className="PlayButton" onClick={this.props.onClick}>
        Play
      </button>
    );
  }
}
