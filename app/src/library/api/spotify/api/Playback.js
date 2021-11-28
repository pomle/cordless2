import { albumURI, playlistURI, trackURI } from '../uri.js';
import { CoreAPI } from './Core.js';

export const Repeat = {
  OFF: 'off',
  CONTEXT: 'context',
  TRACK: 'track',
};

export class PlaybackAPI extends CoreAPI {

  setDevice(deviceId) {
    this.deviceId = deviceId;
  }

  urlWithDevice(path, device_id) {
    if (!device_id) {
      throw new TypeError('Device id argument missing');
    }

    return this.url(`${path}?device_id=${device_id}`);
  }

  playAlbum(albumId, startTrackId) {
    return this.playContext(
      albumURI(albumId),
      startTrackId && trackURI(startTrackId));
  }

  playContext(contextURI, offsetURI) {
    return this.request(
      this.urlWithDevice('v1/me/player/play', this.deviceId),
      {
        context_uri: contextURI,
        offset: {
          [offsetURI ? 'uri' : 'position']: offsetURI || 0,
        }
      },
      'PUT'
    );
  }

  playPlaylist(userId, playlistId, startTrackId) {
    return this.playContext(
      playlistURI(userId, playlistId),
      startTrackId && trackURI(startTrackId));
  }

  playTracks(trackIds, startTrackId) {
    return this.request(
      this.urlWithDevice('v1/me/player/play', this.deviceId),
      {
        uris: trackIds.map(trackURI),
        offset: {
          uri: trackURI(startTrackId || trackIds[0]),
        },
      },
      'PUT'
    );
  }

  resume() {
    return this.request(this.url('v1/me/player/play'), null, 'PUT');
  }

  pause() {
    return this.request(this.url('v1/me/player/pause'), null, 'PUT');
  }

  next() {
    return this.request(this.url('v1/me/player/next'), null, 'POST');
  }

  prev() {
    return this.request(this.url('v1/me/player/previous'), null, 'POST');
  }

  repeat(state) {
    return this.request(this.url('v1/me/player/repeat', [['state', state]]), null, 'PUT');
  }

  seek(ms) {
    return this.request(this.url('v1/me/player/seek', [['position_ms', ms]]), null, 'PUT');
  }

  shuffle(state) {
    return this.request(this.url('v1/me/player/shuffle', [['state', state]]), null, 'PUT');
  }

  volume(fraction) {
    const percent = (fraction * 100).toFixed();
    return this.request(this.url('v1/me/player/volume', [['volume_percent', percent]]), null, 'PUT');
  }
}
