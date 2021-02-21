import React, { Component } from 'react';
import MyPlaylistsMount from 'store/mounts/MyPlaylists';
import PlaylistCollection from 'fragments/PlaylistCollection';
import { ViewHeader } from 'components/ViewHeader';

class MyPlaylistsView extends Component {
  render() {
    return <div className="MyPlaylistsView">
      <ViewHeader caption="Your Playlists"/>

      <MyPlaylistsMount component={PlaylistCollection} />
    </div>
  }
}

export default MyPlaylistsView;
