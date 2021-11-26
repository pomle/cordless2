export function matcher(needle) {
  needle = needle.toLowerCase();
  return function match(...haystack) {
    return haystack.some((word) =>
      word.toString().toLowerCase().includes(needle)
    );
  };
}

export function matchPlaylist(playlist, match) {
  return match([playlist.get("name")]);
}

export function matchTrack(track, match) {
  const subjects = [
    track.get("name"),
    ...track.get("artists").map((artist) => artist.get("name")),
    track.get("album").get("name"),
  ];
  return match(subjects);
}
