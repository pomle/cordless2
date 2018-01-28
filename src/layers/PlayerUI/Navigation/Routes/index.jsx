import React from 'react';

import AlbumView from 'views/Album';

export function AlbumRoute({match}) {
  return <AlbumView albumId={match.params.albumId}/>
}
