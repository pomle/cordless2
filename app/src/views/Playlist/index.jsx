import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { QuickSearch } from "components/QuickSearch";
import { TrackList } from "fragments/TrackList";
import { Track } from "fragments/Track";
import { PlaylistDetailHeader } from "./Header";

import { matcher, matchTrack } from "library/search";

import { fetchPlaylist, playPlaylist } from "store";

export class PlaylistView extends PureComponent {
  static propTypes = {
    fetchPlaylist: PropTypes.func.isRequired,
    playPlaylist: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props);

    this.state = {
      filter: "",
    };
  }

  componentDidMount() {
    const { userId, playlistId, fetchPlaylist } = this.props;
    fetchPlaylist(userId, playlistId);
  }

  getEntries() {
    const { playlist } = this.props;
    const { filter } = this.state;

    const entries = playlist.getIn(["tracks", "items"], []);

    if (filter.length) {
      const match = matcher(filter);
      return entries.filter((entry) => matchTrack(entry.get("track"), match));
    }

    return entries;
  }

  playTrack = (track) => {
    const { userId, playlistId, playPlaylist } = this.props;
    playPlaylist(userId, playlistId, track.get("id"));
  };

  updateFilter = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { playlist } = this.props;
    const { filter } = this.state;

    if (!playlist) {
      return null;
    }

    return (
      <div className="PlaylistView">
        <QuickSearch value={filter} onChange={this.updateFilter} />

        <PlaylistDetailHeader playlist={playlist} />

        <TrackList>
          {this.getEntries().map((entry) => {
            const key = entry.getIn(["track", "id"]) + entry.get("added_at");
            return (
              <Track
                key={key}
                track={entry.get("track")}
                play={this.playTrack}
              />
            );
          })}
        </TrackList>
      </div>
    );
  }
}

export default connect(
  (state, { playlistId }) => {
    return {
      playlist: state.playlist.getEntry(playlistId),
    };
  },
  {
    fetchPlaylist,
    playPlaylist,
  }
)(PlaylistView);
