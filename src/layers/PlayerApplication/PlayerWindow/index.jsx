import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { Player } from '@pomle/spotify-react';
import { Visuals } from 'layers/Visuals';
import { PlayerUI } from 'layers/PlayerUI';

import './PlayerWindow.css';

export class PlayerWindow extends Component {
  render() {
    const { player, session } = this.props;

    const classes = ['PlayerWindow'];
    if (player.deviceId) {
      classes.push('ready');
    } else {
      classes.push('pending');
    }

    if (player.currentTrack) {
      classes.push('with-track');
    }

    return (
      <div className={classes.join(' ')}>
        <Player session={session} name="Cordless"/>
        <PlayerUI/>
        <Visuals />
      </div>
    );
  }
}

export default withRouter(connect(state => {
  return {
    player: state.player,
    session: state.session,
  };
})(PlayerWindow));
