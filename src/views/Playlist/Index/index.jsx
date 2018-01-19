import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import { PlaylistIndex } from 'fragments/PlaylistIndex';

export class PlaylistView extends Component {
  static contextTypes = {
    api: PropTypes.object,
  };

  constructor(props, context) {
    super(props);

    this.api = context.api.playlistAPI;

    this.state = {
      playlists: new List(),
    };
  }

  componentDidMount() {
    this.api.consume(this.api.getPlaylists(), items => {
      this.setState(prevState => {
        return { playlists: prevState.playlists.push(...items) };
      });
    });
  }

  render() {
    return <PlaylistIndex
      caption="Your Playlists"
      playlists={this.state.playlists}
    />;
  }
}
