import React, { Component } from 'react';
import MyPlaylistsMount from 'store/mounts/MyPlaylists';
import { PlaylistList } from 'fragments/PlaylistList';
import { Playlist } from 'fragments/Playlist';

import Yxa from 'components/Yxa';

class MyPlaylistsView extends Component {
  render() {
    return <MyPlaylistsMount render={({collection, fetcher}) => (
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

export default MyPlaylistsView;
