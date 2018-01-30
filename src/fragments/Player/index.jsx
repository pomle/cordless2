import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSpotify } from '@pomle/spotify-web-sdk';
import { setAnalysis, setFeature, setAlbumPalette, handleMessage } from 'store';

import { createPoller } from './poller';
import { onChange } from './util';

class SpotifyPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this.setupPlayer(props.player);
  }

  componentWillMount() {
    this.props.player.connect();

    this.poller = createPoller(this.props.player, context => {
      this.props.onMessage('state', context);
    });
  }

  componentWillUnmount() {
    this.props.player.disconnect();
    this.poller.destroy();
  }

  setupPlayer(player) {
    player.on('ready', message => {
      this.onMessage('ready', message);
    });

    player.on('player_state_changed', message => {
      if (!message) {
        console.warn('player_state_changed message was empty', message);
        return;
      }

      this.onMessage('state', message);
    });
  }

  onMessage(type, message) {
    this.props.onMessage(type, message);
  }

  render() {
    return null;
  }
}

class Player extends PureComponent {
  static propTypes = {
    name: PropTypes.string,
    session: PropTypes.object.isRequired,
    handleMessage: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      player: null,
    };
  }

  componentWillMount() {
    getSpotify()
    .then(Spotify => {
      const player = new Spotify.Player({
        name: this.props.name,
        getOAuthToken: callback => {
          const {token} = this.props.session;
          console.log('Giving new token to Spotify Player', token);
          callback(token);
        }
      });

      this.setState({player});
    });
  }

  componentWillReceiveProps({context}) {
    this.onTrackChange(context.getIn(['track_window', 'current_track', 'id']));
    this.onAlbumChange(context.getIn(['track_window', 'current_track', 'album', 'uri']));
  }

  onAlbumChange = onChange(albumURI => {
    const {session, setAlbumPalette} = this.props;
    const api = session.trackAPI;
    const albumId = albumURI.split(':')[2];
    api.request(`https://vibrant.pomle.com/v1/album/${albumId}`)
    .then(palette => setAlbumPalette(albumId, palette));
  });

  onTrackChange = onChange(trackId => {
    const {session, setAnalysis, setFeature} = this.props;
    const api = session.trackAPI;

    api.getAudioFeatures(trackId)
    .then(data => setFeature(trackId, data))

    api.getAudioAnalysis(trackId)
    .then(data => setAnalysis(trackId, data));
  });

  render() {
    const {player} = this.state;
    return player
      ? <SpotifyPlayer
        player={player}
        onMessage={this.props.handleMessage}
      />
      : null;
  }
}

export default connect(state => {
  return {
    context: state.player.context,
    session: state.session,
  }
}, {
  handleMessage,
  setAlbumPalette,
  setAnalysis,
  setFeature,
})(Player);
