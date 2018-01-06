import React, { Component } from 'react';

import {Interface} from './Interface';
import {NowPlaying} from './NowPlaying';
import {Scrubber} from './Scrubber';

import './Playback.css';

export class Playback extends Component {
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
    const {player, playbackAPI} = this.props;
    const {context} = player;
    const trackWindow = context.track_window.toJS();

    return (
      <div className="Playback">
        <NowPlaying track={trackWindow.current_track}/>
        <Scrubber player={player} playbackAPI={playbackAPI}/>
        <Interface player={player} playbackAPI={playbackAPI}/>
      </div>
    );
  }
}
