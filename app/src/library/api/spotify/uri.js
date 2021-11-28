export function playlistURI(userId, playlistId) {
  return `spotify:user:${userId}:playlist:${playlistId}`;
}

export function albumURI(albumId) {
  return `spotify:album:${albumId}`;
}

export function trackURI(trackId) {
  return `spotify:track:${trackId}`;
}
