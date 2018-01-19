import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import { PlaylistIndex } from 'fragments/PlaylistIndex';
import { fetchUserPlaylists } from 'layers/PlayerApplication/store/playlist';

class PlaylistView extends Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    playlists: PropTypes.instanceOf(List).isRequired,
  };

  componentWillMount() {
    this.onUpdate(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.onUpdate(nextProps);
  }

  onUpdate({userId, fetch}) {
    if (this.userId === userId) {
      return;
    }

    this.userId = userId;

    fetch(userId);
  }

  render() {
    console.log('PlaylistView props', this.props);
    return <PlaylistIndex
      caption="Your Playlists"
      playlists={this.props.playlists}
    />;
  }
}

export default connect((state, props) => {
  console.log(state, props);
  return {
    playlists: state.playlist.getEntries(props.userId),
  };
}, {
  fetch: fetchUserPlaylists,
})(PlaylistView);
