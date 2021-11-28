import {getSpotify} from '..';

describe('getSpotify', () => {
  it('returns a Promise that resolves `window.Spotify` when ready', () => {
    window.Spotify = Symbol('fake player');

    const promise = getSpotify()
    .then(Spotify => {
      expect(Spotify).toBe(window.Spotify);
    });

    window.onSpotifyWebPlaybackSDKReady();

    return promise;
  });
});
