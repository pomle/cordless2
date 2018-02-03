import React, { Component } from 'react';
import { connect } from 'react-redux';

import { PlaylistList } from 'fragments/PlaylistList';
import { Playlist } from 'fragments/Playlist';

import Yxa from 'components/Yxa';

import {fetchUserPlaylists} from 'store/store/playlist';

class UserPlaylistsView extends Component {
  fetch(userId) {
    return (offset, limit) => {
      const {fetchUserPlaylists} = this.props;
      fetchUserPlaylists(userId, offset, limit);
    }
  }

  render() {
    const {userId, collection} = this.props;
    console.log(collection);

    return (
      <PlaylistList>
        <Yxa
          collection={collection}
          fetcher={this.fetch(userId)}
          placeholder={<div className="playlist-container"><Playlist /></div>}
          render={playlist => {
            return <div className="playlist-container">
              <Playlist playlist={playlist} />
            </div>
          }}
        />
      </PlaylistList>
    );
  }
}

export default connect(
  (state, props) => ({
    collection: state.stash.get(props.userId),
    playlistAPI: state.session.playlistAPI
  }),
  {fetchUserPlaylists}
)(UserPlaylistsView);
