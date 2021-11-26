import React, { Component } from "react";
import ViewHeader from "components/ViewHeader";
import { connect } from "react-redux";
import { withPlayingTrack } from "store/hoc";

import { ProgressBar } from "components/ProgressBar";

import "./TrackInfo.css";

export const TrackInfo = connect(withPlayingTrack)(
  class TrackInfo extends Component {
    render() {
      const features = (this.features =
        this.props.features || this.features || {});

      return (
        <div className="TrackInfo">
          <ViewHeader caption="Track Stats" />

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
);
