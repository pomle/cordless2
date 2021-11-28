import { Record } from "immutable";
import {
  AlbumAPI,
  ArtistAPI,
  PlaybackAPI,
  PlaylistAPI,
  SearchAPI,
  TrackAPI,
} from "library/api/spotify";

const SessionRecord = Record({
  deviceId: null,
  api: {
    album: new AlbumAPI(),
    artist: new ArtistAPI(),
    playback: new PlaybackAPI(),
    playlist: new PlaylistAPI(),
    search: new SearchAPI(),
    track: new TrackAPI(),
  },
  token: null,
});

export class SessionState extends SessionRecord {
  get albumAPI() {
    return this.prepareAPI(this.api.album);
  }

  get artistAPI() {
    return this.prepareAPI(this.api.artist);
  }

  get playbackAPI() {
    this.api.playback.setDevice(this.deviceId);
    return this.prepareAPI(this.api.playback);
  }

  get playlistAPI() {
    return this.prepareAPI(this.api.playlist);
  }

  get searchAPI() {
    return this.prepareAPI(this.api.search);
  }

  get trackAPI() {
    return this.prepareAPI(this.api.track);
  }

  prepareAPI(api) {
    api.token = this.token;
    return api;
  }
}
