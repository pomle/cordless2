import React, {PureComponent} from 'react';

import AlbumView from 'views/Album';
import ArtistView from 'views/Artist';
import PlaylistView from 'views/Playlist';
import SearchView from 'views/Search';

export function AlbumRoute({match}) {
  return <AlbumView albumId={match.params.albumId}/>
}

export function ArtistRoute({match}) {
  return <ArtistView artistId={match.params.artistId}/>
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
