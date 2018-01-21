import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ProgressBar } from 'components/ProgressBar';

import './TrackInfo.css';

export class TrackInfo extends Component {
  static contextTypes = {
    track: PropTypes.object,
  };

  render() {
    const { track } = this.context;
    if (track.features) {
      this.features = track.features;
    }

    const features = this.features || {};

    return (
      <div className="TrackInfo">
        <table>
          <tbody>
            <tr className="danceability">
              <th>Danceability</th>
              <td>
                <ProgressBar value={features.danceability} />
              </td>
            </tr>
            <tr className="energy">
              <th>Energy</th>
              <td>
                <ProgressBar value={features.energy} />
              </td>
            </tr>
            <tr className="instrumentalness">
              <th>Instrumentalness</th>
              <td>
                <ProgressBar value={features.instrumentalness} />
              </td>
            </tr>
            <tr className="liveness">
              <th>Liveness</th>
              <td>
                <ProgressBar value={features.liveness} />
              </td>
            </tr>
            <tr className="speechiness">
              <th>Speechiness</th>
              <td>
                <ProgressBar value={features.speechiness} />
              </td>
            </tr>
            <tr className="valence">
              <th>Valence</th>
              <td>
                <ProgressBar value={features.valence} />
              </td>
            </tr>
            <tr className="key">
              <th>Key</th>
              <td>{features.key}</td>
            </tr>
            <tr className="loudness">
              <th>Loudness</th>
              <td>{features.loudness}</td>
            </tr>
            <tr className="mode">
              <th>Mode</th>
              <td>{features.mode}</td>
            </tr>
            <tr className="tempo">
              <th>Tempo</th>
              <td>{features.tempo}</td>
            </tr>
            <tr className="time signature">
              <th>Time Signature</th>
              <td>{features.time_signature}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
