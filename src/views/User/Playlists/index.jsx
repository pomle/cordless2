import React, { Component } from 'react';
import { connect } from 'react-redux';

import { PlaylistList } from 'fragments/PlaylistList';
import { Playlist } from 'fragments/Playlist';

import Yxa from 'components/Yxa';

class UserPlaylistsView extends Component {
  fetch(userId) {
    return (offset, limit) => {
      return this.props.playlistAPI.getPlaylists(userId, {offset, limit});
    }
  }

  render() {
    const {userId} = this.props;
    const key = `playlists-${userId}`;

    return (
      <PlaylistList>
        <Yxa
          namespace={key}
          fetcher={this.fetch(userId)}
          render={playlist => {
            return <Playlist playlist={playlist} />
          }}
        />
      </PlaylistList>
    );
  }
}

export default connect(
  (state) => ({playlistAPI: state.session.playlistAPI})
)(UserPlaylistsView);
