import {PlaybackAPI, Repeat} from '../Playback.js';

describe('Playback API', () => {
  let playbackAPI;

  beforeEach(() => {
    playbackAPI = new PlaybackAPI();
    playbackAPI.setDevice('2839nm5yv20n35238y20357vh2');
    playbackAPI.request = jest.fn();
  });

  describe('#playContext()', () => {
    it('creates a decent context payload without offset', () => {
      playbackAPI.playContext('spotify:album:k0c2385hj239fj0');
      expect(playbackAPI.request).toBeCalledWith(
        'https://api.spotify.com/v1/me/player/play?device_id=2839nm5yv20n35238y20357vh2',
        {"context_uri": "spotify:album:k0c2385hj239fj0", "offset": {"position": 0}},
        'PUT'
      );
    });

    it('has track as offset when given', () => {
      playbackAPI.playContext('spotify:album:k0c2385hj239fj0', 'spotify:track:1925y1021r12f');
      expect(playbackAPI.request).toBeCalledWith(
        'https://api.spotify.com/v1/me/player/play?device_id=2839nm5yv20n35238y20357vh2',
        {"context_uri": "spotify:album:k0c2385hj239fj0", "offset": {"uri": "spotify:track:1925y1021r12f"}},
        'PUT'
      );
    });
  });

  describe('#playAlbum()', () => {
    it('converts ids to uris', () => {
      playbackAPI.playAlbum('k0c2385hj239fj0', '1925y1021r12f');
      expect(playbackAPI.request).toBeCalledWith(
        'https://api.spotify.com/v1/me/player/play?device_id=2839nm5yv20n35238y20357vh2',
        {"context_uri": "spotify:album:k0c2385hj239fj0", "offset": {"uri": "spotify:track:1925y1021r12f"}},
        'PUT'
      );
    });
  });

  describe('#playPlaylist()', () => {
    it('converts ids to uris', () => {
      playbackAPI.playPlaylist('pomle', 'k0c2385hj239fj0', '1925y1021r12f');
      expect(playbackAPI.request).toBeCalledWith(
        'https://api.spotify.com/v1/me/player/play?device_id=2839nm5yv20n35238y20357vh2',
        {"context_uri": "spotify:user:pomle:playlist:k0c2385hj239fj0", "offset": {"uri": "spotify:track:1925y1021r12f"}},
        'PUT'
      );
    });
  });

  describe('#playTracks()', () => {
    it('converts ids to uri and defaults to first as offset', () => {
      playbackAPI.playTracks(['2305unm23095bm2', '102v95nu1v20n1', '069nb3v0vv28b']);
      expect(playbackAPI.request).toBeCalledWith(
        'https://api.spotify.com/v1/me/player/play?device_id=2839nm5yv20n35238y20357vh2',
        {"offset": {"uri": "spotify:track:2305unm23095bm2"}, "uris": ["spotify:track:2305unm23095bm2", "spotify:track:102v95nu1v20n1", "spotify:track:069nb3v0vv28b"]},
        'PUT'
      );
    });

    it('converts ids to uri and offset can be specd', () => {
      playbackAPI.playTracks(['2305unm23095bm2', '102v95nu1v20n1', '069nb3v0vv28b'], '102v95nu1v20n1');
      expect(playbackAPI.request).toBeCalledWith(
        'https://api.spotify.com/v1/me/player/play?device_id=2839nm5yv20n35238y20357vh2',
        {"offset": {"uri": "spotify:track:102v95nu1v20n1"}, "uris": ["spotify:track:2305unm23095bm2", "spotify:track:102v95nu1v20n1", "spotify:track:069nb3v0vv28b"]},
        'PUT'
      );
    });
  });

  describe('#shuffle', () => {
    describe('when set to true', () => {
      it('sends a PUT request with a true param', () => {
        playbackAPI.shuffle(true);
        expect(playbackAPI.request).toBeCalledWith(
          'https://api.spotify.com/v1/me/player/shuffle?state=true',
          null,
          'PUT'
        );
      });
    });

    describe('when set to false', () => {
      it('sends a PUT request with a false param', () => {
        playbackAPI.shuffle(false);
        expect(playbackAPI.request).toBeCalledWith(
          'https://api.spotify.com/v1/me/player/shuffle?state=false',
          null,
          'PUT'
        );
      });
    });
  });

  describe('#repeat', () => {
    describe('when set to nothing', () => {
      it('turns off repeat', () => {
        playbackAPI.repeat(Repeat.OFF);
        expect(playbackAPI.request).toBeCalledWith(
          'https://api.spotify.com/v1/me/player/repeat?state=off',
          null,
          'PUT'
        );
      });
    });

    describe('when set to context', () => {
      it('turns on context repeat', () => {
        playbackAPI.repeat(Repeat.CONTEXT);
        expect(playbackAPI.request).toBeCalledWith(
          'https://api.spotify.com/v1/me/player/repeat?state=context',
          null,
          'PUT'
        );
      });
    });

    describe('when set to track', () => {
      it('turns on track repeat', () => {
        playbackAPI.repeat(Repeat.TRACK);
        expect(playbackAPI.request).toBeCalledWith(
          'https://api.spotify.com/v1/me/player/repeat?state=track',
          null,
          'PUT'
        );
      });
    });
  });


  describe('#volume', () => {
    describe('when given fraction between 0 and 1', () => {
      [
        [0, '0'],
        [0.5234, '52'],
        [1, '100'],
      ].forEach(([arg, param]) => {
        it(`sends ${param} for ${arg}`, () => {
          playbackAPI.volume(arg);
          expect(playbackAPI.request).toBeCalledWith(
            `https://api.spotify.com/v1/me/player/volume?volume_percent=${param}`,
            null,
            'PUT'
          );
        });
      });
    });
  });
});
