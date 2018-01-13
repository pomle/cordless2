import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import {
  createPlayer,
  AlbumAPI,
  PlaybackAPI,
  PlaylistAPI,
  SearchAPI,
  TrackAPI,
} from '@pomle/spotify-web-sdk';

import { LRUCache } from 'library/cache';
import { ImagePool } from 'library/ImagePool';

import { createPoller } from './poller.js';

import { PlayerState } from './state.js';

import { Visuals } from 'layers/Visuals';
import { PlayerUI } from 'layers/PlayerUI';

import './PlayerApplication.css';

export class PlayerApplication extends Component {
  static childContextTypes = {
    api: PropTypes.object,
    images: PropTypes.object,
  };

  constructor(props) {
    super(props);

    const { token } = props;

    this.images = new ImagePool(new LRUCache(1000));

    this.api = {
      albumAPI: new AlbumAPI(token),
      playbackAPI: new PlaybackAPI(token),
      playlistAPI: new PlaylistAPI(token),
      searchAPI: new SearchAPI(token),
      trackAPI: new TrackAPI(token),
    };

    this.state = {
      player: new PlayerState(),
    };
  }

  getChildContext() {
    return {
      api: this.api,
      images: this.images,
    };
  }

  async componentDidMount() {
    this.player = await createPlayer(this.props.token, {
      name: 'Cordless',
    });

    this.poller = createPoller(this.player, state => {
      this.update(player => player.updateState(state));
    });

    const result = await this.player.connect();

    this.update(player => player.set('connected', result));

    this.player.on('ready', message => {
      this.api.playbackAPI.setDevice(message.device_id);
      this.update(player => player.onMessage({ type: 'ready', message }));
    });

    this.player.on('player_state_changed', message => {
      this.update(player => player.onMessage({ type: 'state', message }));
    });
  }

  update(fn) {
    this.setState(prevState =>
      Object.assign({}, prevState, {
        player: fn(prevState.player),
      })
    );
  }

  render() {
    const { player } = this.state;

    const classes = ['PlayerApplication'];
    if (player.deviceId) {
      classes.push('ready');
    } else {
      classes.push('pending');
    }

    return (
      <Route
        path="*"
        render={({ match }) => {
          return (
            <div className={classes.join(' ')}>
              <PlayerUI player={player} />

              <Visuals
                promote={match.url === '/now-playing'}
                context={player.context}
                track={player.context.toJS().track_window.current_track}
              />
            </div>
          );
        }}
      />
    );
  }
}
