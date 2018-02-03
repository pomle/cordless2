import React, { Component } from 'react';
import UserPlaylistsMount from 'store/mounts/UserPlaylists';
import { PlaylistList } from 'fragments/PlaylistList';
import { Playlist } from 'fragments/Playlist';

import Yxa from 'components/Yxa';

class UserPlaylistsView extends Component {
  render() {
    const {userId} = this.props;

    return <UserPlaylistsMount userId={userId} render={({collection, fetcher}) => (
        <PlaylistList>
          <Yxa
            collection={collection}
            fetcher={fetcher}
            placeholder={<div className="playlist-container"><Playlist /></div>}
            render={playlist => {
              return <div className="playlist-container">
                <Playlist playlist={playlist} />
              </div>
            }}
          />
        </PlaylistList>
    )}/>;
  }
}

export default UserPlaylistsView;
