import React, { Component } from 'react';
import { connect } from 'react-redux';

import { PlaylistList } from 'fragments/PlaylistList';
import { Playlist } from 'fragments/Playlist';

import Yxa from 'components/Yxa';

import {fetchUserPlaylists} from 'store/store/userPlaylists';

class UserPlaylistsView extends Component {
  fetch(userId) {
    return (offset, limit) => {
      const {fetchUserPlaylists, collection} = this.props;
      if (collection.items.get(offset)) {
        return;
      }

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
  (state, props) => ({collection: state.userPlaylists.get(props.userId)}),
  {fetchUserPlaylists}
)(UserPlaylistsView);
