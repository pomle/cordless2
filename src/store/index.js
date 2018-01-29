import { createStore } from './store';

import { fetchAlbum } from './store/album';
import { fetchArtist } from './store/artist';
import { setAlbumPalette } from './store/color';
import { cyclePlayback, cycleRepeat, cycleShuffle, playAlbum, playContext, playPlaylist, playTracks, pause, resume, seek, next, prev, repeat, shuffle, volume, handleMessage } from './store/player';
import { fetchUserPlaylists, fetchPlaylist } from './store/playlist';
import { search } from './store/search';
import { setToken } from './store/session';
import { setAnalysis, setFeature } from './store/track';
import { fetchUser } from './store/user';

export {
  createStore,
};

// Playback Actions
export {
    cyclePlayback,
    cycleRepeat,
    cycleShuffle,
    playAlbum,
    playContext,
    playPlaylist,
    playTracks,
    pause,
    resume,
    seek,
    next,
    prev,
    repeat,
    shuffle,
    volume,
};

// Actions
export {
  fetchAlbum,
  fetchArtist,
  fetchPlaylist,
  fetchUser,
  fetchUserPlaylists,
  handleMessage,
  search,
  setAlbumPalette,
  setAnalysis,
  setFeature,
  setToken,
};
