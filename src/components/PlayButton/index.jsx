import React, { Component } from 'react';

import './PlayButton.css';

export class PlayButton extends Component {
  render() {
    const {player} = this.props;
    const classes = ['PlayButton'];
    if (player.deviceId) {
      classes.push('ready');
    } else {
      classes.push('pending');
    }

    return (
      <button
        className={classes.join(' ')}
        onClick={this.props.onClick}>
        Play
      </button>
    );
  }
}
