import React, { Component } from 'react';

import * as icon from 'assets/icons';
import './PlayButton.css';

const style = {
    backgroundImage: `url(${icon.play})`,
};

export class PlayButton extends Component {
  render() {
    return (
      <button className="PlayButton" onClick={this.props.onClick}>
        <div className="icon" style={style}>
          Play
        </div>
      </button>
    );
  }
}
