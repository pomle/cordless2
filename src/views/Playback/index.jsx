import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Interface } from './Interface';
import { NowPlaying } from './NowPlaying';
import { Scrubber } from './Scrubber';
import { Time } from 'components/Time';

import './Playback.css';

export class Playback extends Component {
  toggle = () => {
    const { context } = this.props.player;
    if (context.paused) {
      this.props.playbackAPI.resume();
    } else {
      this.props.playbackAPI.pause();
    }
  };

  next = () => {
    this.props.playbackAPI.next();
  };

  prev = () => {
    this.props.playbackAPI.prev();
  };

  seek = ms => {
    this.props.playbackAPI.seek(ms);
  };

  render() {
    const { player: { context } } = this.props;
    const trackWindow = context.track_window.toJS();

    return (
      <div className="Playback">
        <NowPlaying track={trackWindow.current_track} />
        <Scrubber context={context} seek={this.seek} />
        <Interface prev={this.prev} next={this.next} toggle={this.toggle} />
        <div className="vis">
          <Link to="/now-playing">Now Playing</Link>
          <div className="time">
            <Time seconds={context.position / 1000} />
          </div>
        </div>
      </div>
    );
  }
}
