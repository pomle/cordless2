import { Record, Map } from 'immutable';

const State = Record({
  album: new Map(),
});

const SET_ALBUM_PALETTE = 'r/color/set-album-palette';

export function setAlbumPalette(albumId, palette) {
  return {
    type: SET_ALBUM_PALETTE,
    albumId,
    palette,
  };
}

export function reducer(state = new State(), action = {}) {
  switch(action.type) {
    case SET_ALBUM_PALETTE:
      return state.setIn(['album', action.albumId], action.palette);
    default:
      return state;
  }
}
