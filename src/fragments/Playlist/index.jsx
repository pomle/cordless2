import React, { Component } from 'react';

export class Playlist extends Component {
  play = () => {
    const {playbackAPI, playlist, player} = this.props;
    playbackAPI.playContext(playlist.uri, player.deviceId);
  }

  render() {
    const {playlist} = this.props;

    return <div className="Playlist">
      <div className="name">{playlist.name}</div>
      <button onClick={this.play}>Play</button>
    </div>;
  }
}
