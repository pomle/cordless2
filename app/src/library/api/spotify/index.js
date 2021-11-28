import { AlbumAPI } from './api/Album.js';
import { ArtistAPI } from './api/Artist.js';
import { PlaylistAPI } from './api/Playlist.js';
import { PlaybackAPI } from './api/Playback.js';
import { SearchAPI } from './api/Search.js';
import { TrackAPI } from './api/Track.js';
import { UserAPI } from './api/User.js';

import * as analysis from './analysis.js';

export {
  AlbumAPI,
  ArtistAPI,
  PlaybackAPI,
  PlaylistAPI,
  SearchAPI,
  TrackAPI,
  UserAPI,
  analysis,
};

const waitFnName = 'onSpotifyWebPlaybackSDKReady';

const playerPromise = new Promise(resolve => {
  if (window[waitFnName]) {
    throw new Error(`${waitFnName} already defined`);
  }

  window[waitFnName] = () => {
    resolve(window.Spotify);
  };
});

export function getSpotify() {
  return playerPromise;
}
