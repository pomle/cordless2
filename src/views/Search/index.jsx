import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import { TrackList } from 'fragments/TrackList';
import { Track } from 'fragments/Track';

import { debounce } from 'library/debounce';

import './Search.css';

export class Search extends Component {
  static contextTypes = {
    api: PropTypes.object,
  };

  constructor(props, context) {
    super(props);

    this.searchAPI = context.api.searchAPI;
    this.playbackAPI = context.api.playbackAPI;

    this.handleSearchInput = debounce(this.handleSearchInput, 300);

    this.query = null;

    this.state = {
      busy: false,
      query: props.query || '',
      tracks: new List(),
      searchWasPerformed: props.query && props.query.length > 0,
    };
  }

  componentDidMount() {
    if (this.state.query) {
      this.performSearch(this.state.query);
    }
  }

  handleChange = event => {
    const query = event.target.value;
    this.setState({query});

    if (query.length > 2) {
      this.handleSearchInput(query);
    } else {
      this.setState({
        tracks: new List(),
      });
    }
  };

  handleSearchInput(query) {
    this.props.onQuery(query);
    this.performSearch(query)
  }

  performSearch(query) {
    this.setState({
      busy: true,
      searchWasPerformed: true,
    });

    this.query = query;

    return this.searchAPI.search('track', query).then(data => {
      if (this.query === query) {
        if (data.error) {
          console.error(data);
          return;
        }

        this.setState({
          busy: false,
          tracks: new List(data.tracks.items),
        });
      }
    });
  }

  playTrack = track => {
    const trackIds = this.state.tracks.map(track => track.id);
    this.playbackAPI.playTracks(trackIds, track.id);
  };

  render() {
    const { query, searchWasPerformed, tracks } = this.state;

    const classes = ['Search'];
    if (searchWasPerformed) {
      classes.push('hasResults');
    }

    return (
      <div className={classes.join(' ')}>
        <header>
          <h2>Search</h2>

          <input type="text" autoFocus value={query} onChange={this.handleChange} />
        </header>

        <div className="results">
          <TrackList>
            {tracks.map(track => {
              return (
                <Track
                  key={track.id}
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
