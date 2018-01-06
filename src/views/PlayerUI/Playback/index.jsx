import React, { Component } from 'react';

import './Playback.css';

export class Playback extends Component {
  componentDidMount() {

  }

  toggle = () => {
    const {context} = this.props.player;
    if (context.paused) {
      this.props.playbackAPI.resume();
    } else {
      this.props.playbackAPI.pause();
    }
  }

  next = () => {
    this.props.playbackAPI.next();
  }

  prev = () => {
    this.props.playbackAPI.prev();
  }

  render() {
    console.log(this.props.player.context);
    return (
      <div className="Playback">
        <div className="nowPlaying"/>
        <div className="trackProgress"/>
        <div>
          <button onClick={this.prev}>Prev</button>
          <button onClick={this.toggle}>Play/Pause</button>
          <button onClick={this.next}>Next</button>
        </div>
      </div>
    );
  }
}
