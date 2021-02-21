import React, { Component } from 'react';
import UserPlaylistsMount from 'store/mounts/UserPlaylists';
import PlaylistCollection from 'fragments/PlaylistCollection';
import { ViewHeader } from 'components/ViewHeader';

class UserPlaylistsView extends Component {
  render() {
    const {userId} = this.props;

    return <div className="UserPlaylistsView">
      <ViewHeader caption={`${userId}'s Playlists`}/>

      <UserPlaylistsMount userId={userId} component={PlaylistCollection}/>
    </div>
  }
}

export default UserPlaylistsView;
