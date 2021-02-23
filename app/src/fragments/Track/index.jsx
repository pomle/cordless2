import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

import { PlayButton } from "components/PlayButton";
import { Time } from "components/Time";
import { Artists } from "fragments/Artists";

export class Track extends PureComponent {
  play = () => {
    this.props.play(this.props.track);
  };

  render() {
    const { track } = this.props;
    const isLocal = track.get("uri").startsWith("spotify:local:");

    const albumURL = `/album/${track.getIn(["album", "id"])}`;

    return (
      <div className="Track">
        <div className="playback">
          {!isLocal ? (
            <PlayButton onClick={this.play} />
          ) : (
            <button>Local</button>
          )}
        </div>

        <div className="name">{track.get("name")}</div>

        <div className="artists">
          <Artists artists={track.get("artists")} />
        </div>

        <div className="album">
          {track.has("album") ? (
            <Link to={albumURL}>{track.getIn(["album", "name"])}</Link>
          ) : null}
        </div>

        <div className="duration">
          <Time seconds={track.get("duration_ms") / 1000} />
        </div>
      </div>
    );
  }
}
