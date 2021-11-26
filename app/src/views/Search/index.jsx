import React, { Component } from "react";
import { connect } from "react-redux";

import ViewHeader from "components/ViewHeader";
import { TrackList } from "fragments/TrackList";
import { Track } from "fragments/Track";

import { debounce } from "library/debounce";
import { search, playTracks } from "store";

import "./SearchView.css";

class SearchView extends Component {
  constructor(props) {
    super(props);

    this.handleSearchInput = debounce(this.handleSearchInput, 300);

    this.query = null;

    this.state = {
      query: props.query || "",
      searchWasPerformed: props.query && props.query.length > 0,
    };
  }

  componentDidMount() {
    if (this.state.query) {
      this.performSearch(this.state.query);
    }
  }

  handleChange = (event) => {
    const query = event.target.value;
    this.setState({ query });

    if (query.length > 2) {
      this.handleSearchInput(query);
    }
  };

  handleSearchInput(query) {
    this.props.onQuery(query);
    this.performSearch(query);
  }

  performSearch(query) {
    this.props.search(query);

    this.setState({
      searchWasPerformed: true,
    });
  }

  playTrack = (track) => {
    const { playTracks, tracks } = this.props;
    const trackIds = tracks.map((track) => track.get("id"));
    playTracks(trackIds, track.get("id"));
  };

  render() {
    const { tracks } = this.props;
    const { query, searchWasPerformed } = this.state;

    const classes = ["SearchView"];
    if (searchWasPerformed) {
      classes.push("hasResults");
    }

    return (
      <div className={classes.join(" ")}>
        <ViewHeader caption="Search">
          <div>
            <input
              type="text"
              autoFocus
              value={query}
              onChange={this.handleChange}
            />
          </div>
        </ViewHeader>

        <div className="results">
          <TrackList>
            {tracks.map((track) => {
              return (
                <Track
                  key={track.get("id")}
                  track={track}
                  play={this.playTrack}
                />
              );
            })}
          </TrackList>
        </div>
      </div>
    );
  }
}

export default connect(
  (state, { query }) => {
    return {
      tracks: state.search.track.getEntries(query),
    };
  },
  {
    search,
    playTracks,
  }
)(SearchView);
