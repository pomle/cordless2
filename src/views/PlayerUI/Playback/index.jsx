import React, { Component } from 'react';

import {NowPlaying} from './NowPlaying';

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
    const {context} = this.props.player;
    const trackWindow = context.track_window.toJS();

    return (
      <div className="Playback">
        <NowPlaying track={trackWindow.current_track}/>
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
