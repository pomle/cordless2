export function matcher(needle) {
  needle = needle.toLowerCase();
  return function match(...haystack) {
    return haystack.some(word => word.toString().toLowerCase().includes(needle));
  };
}

export function matchTrack(track, match) {
  return match([
    track.get('name'),
    ...track.get('artists').map(artist => artist.get('name')),
    track.getIn('album','name'),
  ]);
}
