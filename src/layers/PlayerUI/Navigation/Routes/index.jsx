import React from 'react';

import AlbumView from 'views/Album';
import ArtistView from 'views/Artist';
import PlaylistView from 'views/Playlist/Detail';

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
