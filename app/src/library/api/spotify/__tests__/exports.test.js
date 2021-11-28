import * as SpotifyWebSDK from '..';

describe('Exports', () => {
  [
    'AlbumAPI',
    'ArtistAPI',
    'PlaybackAPI',
    'PlaylistAPI',
    'SearchAPI',
    'TrackAPI',
    'UserAPI',
    'analysis',
    'getSpotify',
  ].forEach(name => {
    it(`exports ${name}`, () => {
      expect(SpotifyWebSDK[name]).toBeTruthy();
    });
  });
});
