import { CoreAPI } from './Core.js';

export class TrackAPI extends CoreAPI {
  getAudioAnalysis(trackId) {
    return this.request(this.url(`v1/audio-analysis/${trackId}`));
  }

  getAudioFeatures(trackId) {
    return this.request(this.url(`v1/audio-features/${trackId}`));
  }
}
