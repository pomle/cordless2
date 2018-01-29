import { Record } from 'immutable';
import { AlbumAPI, ArtistAPI, PlaybackAPI, PlaylistAPI, SearchAPI, TrackAPI } from '@pomle/spotify-web-sdk';

const State = Record({
  deviceId: null,
  token: null,
});

export class Session extends State {
  get albumAPI() {
    return new AlbumAPI(this.token);
  }

  get artistAPI() {
    return new ArtistAPI(this.token);
  }

  get playbackAPI() {
    const api = new PlaybackAPI(this.token);
    api.setDevice(this.deviceId);
    return api;
  }

  get playlistAPI() {
    return new PlaylistAPI(this.token);
  }

  get searchAPI() {
    return new SearchAPI(this.token);
  }

  get trackAPI() {
    return new TrackAPI(this.token);
  }
}
