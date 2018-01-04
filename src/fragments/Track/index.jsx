import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Track extends Component {
  play = () => {
    const { playbackAPI, track, player } = this.props;
    playbackAPI.playContext(track.uri, player.deviceId);
  };

  render() {
    const { track } = this.props;

    return (
      <div className="Track">
        <button onClick={this.play}>Play</button>
        {track.name}
      </div>
    );
  }
}
