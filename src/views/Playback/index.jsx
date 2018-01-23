import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Interface } from './Interface';
import { NowPlaying } from './NowPlaying';
import { Scrubber } from './Scrubber';
import { Time } from 'components/Time';

import { cyclePlayback, cycleRepeat, cycleShuffle, seek, next, prev, volume } from '@pomle/spotify-redux';

import './Playback.css';

const REPEAT_MODES = ['off', 'context', 'track'];

export class Playback extends Component {
  render() {
    const { cycleRepeat, cycleShuffle, cyclePlayback, prev, next, seek, player, analysis } = this.props;
    const context = player.context;

    const classes = ['Playback'];

    classes.push(context.shuffle ? 'shuffle-on' : 'shuffle-off');
    classes.push('repeat-' + REPEAT_MODES[context.repeat_mode]);

    return (
      <div className={classes.join(' ')}>
        <NowPlaying track={player.currentTrack} />
        <Scrubber
          context={context}
          seek={seek}
          analysis={analysis}
        />
        <Interface
          next={next}
          prev={prev}
          repeat={cycleRepeat}
          shuffle={cycleShuffle}
          toggle={cyclePlayback}
        />
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

export default connect(state => {
  const track = state.player.currentTrack;
  const trackId = track && track.get('id');
  return {
    analysis: state.track.analysis.get(trackId),
    player: state.player,
    playbackAPI: state.session.playbackAPI,
  };
}, {
  seek, next, prev, cycleRepeat, cycleShuffle, cyclePlayback, volume,
})(Playback);
