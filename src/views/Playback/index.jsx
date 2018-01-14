import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Interface } from './Interface';
import { NowPlaying } from './NowPlaying';
import { Scrubber } from './Scrubber';
import { Time } from 'components/Time';

import './Playback.css';

export class Playback extends Component {
  static contextTypes = {
    api: PropTypes.object,
  };

  constructor(props, context) {
    super(props);
    this.api = context.api.playbackAPI;
  }

  toggle = () => {
    const { context } = this.props.player;
    if (context.paused) {
      this.api.resume();
    } else {
      this.api.pause();
    }
  };

  next = () => {
    this.api.next();
  };

  prev = () => {
    this.api.prev();
  };

  seek = ms => {
    this.api.seek(ms);
  };

  render() {
    const { player: { context } } = this.props;
    const trackWindow = context.track_window;

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
