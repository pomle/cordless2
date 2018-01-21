import React, { Component } from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

import { Player } from '@pomle/spotify-react';
import { createStore, setToken } from '@pomle/spotify-redux';

import PlayerWindow from './PlayerWindow';

import { LRUCache } from 'library/cache';
import { ImagePool } from 'library/ImagePool';

import { Visuals } from 'layers/Visuals';
import { PlayerUI } from 'layers/PlayerUI';

export class PlayerApplication extends Component {
  static childContextTypes = {
    images: PropTypes.object,
  };

  constructor(props) {
    super(props);

    const { token } = props;

    this.images = new ImagePool(new LRUCache(1000));

    this.store = createStore();
    this.store.dispatch(setToken(token));
  }

  getChildContext() {
    return {
      images: this.images,
    };
  }

  onTrackChange(track) {
    this.setState({
      track,
      analysis: null,
      features: null,
    });

    const api = this.api.trackAPI;

    api
      .getAudioFeatures(track.id)
      .then(features => this.setState({ features }));

    api
      .getAudioAnalysis(track.id)
      .then(analysis => this.setState({ analysis }));
  }

  render() {
    return (
      <Provider store={this.store}>
        <Player name="Cordless">
          <PlayerWindow>
            <PlayerUI/>

            <Visuals />
          </PlayerWindow>
        </Player>
      </Provider>
    );
  }
}
