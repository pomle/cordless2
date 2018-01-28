import React from 'react';

import AlbumView from 'views/Album';
import ArtistView from 'views/Artist';

export function AlbumRoute({match}) {
  return <AlbumView albumId={match.params.albumId}/>
}

export function ArtistRoute({match}) {
  return <ArtistView artistId={match.params.artistId}/>
}
