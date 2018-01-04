import { CoreAPI } from '../CoreAPI.js';

export class PlaybackAPI extends CoreAPI {
  url(device_id) {
    if (!device_id) {
      throw new TypeError('Device id argument missing');
    }

    return super.url(`v1/me/player/play?device_id=${device_id}`);
  }

  playContext(contextURI, device_id) {


    return this.request(
      this.url(device_id),
      {
        context_uri: contextURI,
      },
      'PUT'
    );
  }

  playTracks(trackURIs, trackURI, device_id) {
    return this.request(
      this.url(device_id),
      {
        uris: trackURIs,
        offset: {
          uri: trackURI,
        },
      },
      'PUT'
    );
  }
}
