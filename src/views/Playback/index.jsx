import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Interface } from './Interface';
import { NowPlaying } from './NowPlaying';
import { Scrubber } from './Scrubber';
import { Time } from 'components/Time';

import './Playback.css';

export class Playback extends Component {
  static propTypes = {
    playbackAPI: PropTypes.object.isRequired,
  };

  toggle = () => {
    const { playbackAPI: api, player: {context} } = this.props;
    if (context.paused) {
      api.resume();
    } else {
      api.pause();
    }
  };

  next = () => {
    this.props.playbackAPI.next();
  }

  prev = () => {
    this.props.playbackAPI.prev();
  }

  seek = (ms) => {
    this.props.playbackAPI.seek(ms);
  };

  render() {
    const { player, analysis } = this.props;

    return (
      <div className="Playback">
        <NowPlaying track={player.currentTrack} />
        <Scrubber
          context={player.context}
          seek={this.seek}
          analysis={analysis}
        />
        <Interface prev={this.prev} next={this.next} toggle={this.toggle} />
        <div className="vis">
          <Link to="/now-playing">Now Playing</Link>
          <div className="time">
            <Time seconds={player.context.position / 1000} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => {
  const track = state.player.currentTrack;
  const trackId = track && track.get('id');
  return {
    analysis: state.track.analysis.get(trackId),
    player: state.player,
    playbackAPI: state.session.playbackAPI,
  };
})(Playback);
