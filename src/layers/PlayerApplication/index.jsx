import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  AlbumAPI,
  ArtistAPI,
  PlaybackAPI,
  PlaylistAPI,
  SearchAPI,
  TrackAPI,
} from '@pomle/spotify-web-sdk';

import { CordlessPlayer } from './CordlessPlayer';

import { LRUCache } from 'library/cache';
import { ImagePool } from 'library/ImagePool';

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
    this.cordless = new CordlessPlayer(token);

    this.state = {
      player: this.cordless.getState(),
      track: null,
    };

    this.api = {
      albumAPI: new AlbumAPI(token),
      artistAPI: new ArtistAPI(token),
      playbackAPI: new PlaybackAPI(token),
      playlistAPI: new PlaylistAPI(token),
      searchAPI: new SearchAPI(token),
      trackAPI: new TrackAPI(token),
    };
  }

  getChildContext() {
    return {
      api: this.api,
      images: this.images,
    };
  }

  componentDidMount() {
    this.cordless.onUpdate = player => {
      this.api.playbackAPI.setDevice(player.deviceId);

      this.setState({
        player,
        track: player.context.toJS().track_window.current_track,
      });
    };

    this.cordless.initialize();
  }

  componentWillUnmount() {
    this.cordless.destroy();
  }

  render() {
    const { player, track } = this.state;

    const classes = ['PlayerApplication'];
    if (player.deviceId) {
      classes.push('ready');
    } else {
      classes.push('pending');
    }

    return <div className={classes.join(' ')}>
      <PlayerUI player={player} />

      <Visuals
        context={player.context}
        track={track}
      />
    </div>;
  }
}
