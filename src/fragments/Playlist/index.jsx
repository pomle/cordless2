import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Playlist extends Component {
  play = () => {
    const { playbackAPI, playlist, player } = this.props;
    playbackAPI.playContext(playlist.uri, player.deviceId);
  };

  render() {
    const { playlist } = this.props;

    return (
      <div className="Playlist">
        <Link to={`/playlist/${playlist.id}`} className="name">{playlist.name}</Link>
        <button onClick={this.play}>Play</button>
      </div>
    );
  }
}
