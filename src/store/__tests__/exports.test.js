import * as SpotifyRedux from '..';

describe('Spotify Redux', () => {
  [
    ['createStore', Function],
    ['cyclePlayback', Function],
    ['cycleRepeat', Function],
    ['cycleShuffle', Function],
    ['playAlbum', Function],
    ['playContext', Function],
    ['playPlaylist', Function],
    ['playTracks', Function],
    ['pause', Function],
    ['resume', Function],
    ['seek', Function],
    ['next', Function],
    ['prev', Function],
    ['repeat', Function],
    ['shuffle', Function],
    ['volume', Function],
    ['fetchAlbum', Function],
    ['fetchArtist', Function],
    ['fetchPlaylist', Function],
    ['fetchUserPlaylists', Function],
    ['handleMessage', Function],
    ['search', Function],
    ['setAlbumPalette', Function],
    ['setAnalysis', Function],
    ['setFeature', Function],
    ['setToken', Function],
  ].forEach(([name, expected]) => {
    it(`exports ${name}`, () => {
      expect(SpotifyRedux[name]).toBeInstanceOf(expected);
    });
  });
});

