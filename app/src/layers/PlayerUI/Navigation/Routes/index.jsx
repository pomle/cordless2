import React, {PureComponent} from 'react';

import AlbumView from 'views/Album';
import ArtistView from 'views/Artist';
import PlaylistView from 'views/Playlist';
import SearchView from 'views/Search';
import UserPlaylistsView from 'views/User/Playlists';

export function AlbumRoute({match}) {
  const {albumId} = match.params;
  return <AlbumView
    key={albumId}
    albumId={albumId}
  />;
}

export function ArtistRoute({match}) {
  const {artistId} = match.params;
  return <ArtistView
    key={artistId}
    artistId={artistId}
  />
}

export function PlaylistRoute({match}) {
  return <PlaylistView
    userId={match.params.userId}
    playlistId={match.params.playlistId}
  />
}

export class SearchRoute extends PureComponent {
  onQuery = (query) => {
    this.props.history.replace(`/search/${encodeURIComponent(query)}`);
  }

  render() {
    const {match} = this.props;
    return <SearchView
      query={match.params.query}
      onQuery={this.onQuery}
    />
  }
}

export function UserPlaylistsRoute({match}) {
  const {userId} = match.params;
  return <UserPlaylistsView
    key={userId}
    userId={userId}
  />;
}
