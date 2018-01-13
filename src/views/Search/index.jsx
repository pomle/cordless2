import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import { Tracklist } from 'fragments/Tracklist';
import { Track } from 'fragments/Track';

import './Search.css';

function debounce(func, wait = 500) {
  let timeout;
  return function debounceWrapper(...args) {
    clearTimeout(timeout);
    const context = this;
    return new Promise(resolve => {
      function later() {
        timeout = null;
        resolve(Reflect.apply(func, context, args));
      }

      timeout = setTimeout(later, wait);
    });
  };
}

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
      query: '',
      tracks: new List(),
    };
  }

  handleChange = event => {
    this.handleSearchInput(event.target.value);
  };

  handleSearchInput(query) {
    this.setState({
      busy: true,
      query,
    });

    this.query = query;

    this.performSearch(query).then(results => {
      if (this.query === results.query) {
        if (results.data.error) {
          console.error(results);
          return;
        }

        this.setState({
          busy: false,
          tracks: new List(results.data.tracks.items),
        });
      }
    });
  }

  performSearch(query) {
    return this.searchAPI.search('track', query).then(data => {
      return { query, data };
    });
  }

  playTrack = track => {
    const trackIds = this.state.tracks.map(track => track.id);
    this.playbackAPI.playTracks(trackIds, track.id);
  };

  render() {
    const { query, tracks } = this.state;

    const classes = ['Search'];
    if (query.length) {
      classes.push('hasResults');
    }

    return (
      <div className={classes.join(' ')}>
        <header>
          <h2>Search</h2>

          <input type="text" autoFocus onChange={this.handleChange} />
        </header>

        <div className="results">
          <Tracklist>
            {tracks.map(track => {
              return (
                <Track
                  key={track.id}
                  track={track}
                  play={this.playTrack}
                />
              );
            })}
          </Tracklist>
        </div>
      </div>
    );
  }
}
