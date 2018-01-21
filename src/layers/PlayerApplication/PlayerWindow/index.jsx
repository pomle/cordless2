import React, { Component } from 'react';
import { connect } from 'react-redux';

import './PlayerWindow.css';

export class PlayerWindow extends Component {
  render() {
    const { player } = this.props;

    const classes = ['PlayerWindow'];
    if (player.deviceId) {
      classes.push('ready');
    } else {
      classes.push('pending');
    }

    return (
      <div className={classes.join(' ')}>
        {this.props.children}
      </div>
    );
  }
}

export default connect(state => {
  return {
    player: state.player,
  };
})(PlayerWindow);
