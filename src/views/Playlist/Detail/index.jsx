import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import { QuickSearch } from 'components/QuickSearch';
import { TrackList } from 'fragments/TrackList';
import { Track } from 'fragments/Track';

import { PlaylistDetailHeader } from './Header';

function matcher(needle) {
  needle = needle.toLowerCase();
  return function match(...haystack) {
    return haystack.some(word => word.toLowerCase().includes(needle));
  };
}

export class PlaylistDetail extends PureComponent {
  static contextTypes = {
    api: PropTypes.object,
  };

  constructor(props, context) {
    super(props);

    this.playlistAPI = context.api.playlistAPI;
    this.playbackAPI = context.api.playbackAPI;

    this.state = {
      filter: '',
      playlist: null,
      tracks: new List(),
    };
  }

  async componentDidMount() {
    const { userId, playlistId } = this.props;

    this.playlistAPI.consume(
      this.playlistAPI.getPlaylistTracks(userId, playlistId),
      items => {
        this.setState(prevState => {
          const filtered = items.filter(entry =>
            entry.track.uri.startsWith('spotify:track:')
          );
          return { tracks: prevState.tracks.push(...filtered) };
        });
      }
    );

    const playlist = await this.playlistAPI.getPlaylist(userId, playlistId);
    this.setState({ playlist });
  }

  getTracks() {
    let { filter, tracks } = this.state;
    if (filter.length) {
      const match = matcher(filter);
      tracks = tracks.filter(entry => {
        const words = [
          entry.track.name,
          ...entry.track.artists.map(artist => artist.name),
          entry.track.album.name,
        ];
        return match(...words);
      });
    }
    return tracks;
  }

  playTrack = track => {
    const { userId, playlistId } = this.props;
    this.playbackAPI.playPlaylist(userId, playlistId, track.id);
  };

  updateFilter = filter => {
    this.setState({ filter });
  };

  render() {
    const { filter, playlist } = this.state;
    const tracks = this.getTracks();

    if (!playlist) {
      return null;
    }

    return (
      <div className="PlaylistDetail">
        <QuickSearch value={filter} onChange={this.updateFilter} />

        <PlaylistDetailHeader playlist={playlist} />

        <TrackList>
          {tracks.map(entry => {
            const { track } = entry;
            const key = track.id + entry.added_at;
            return <Track key={key} track={track} play={this.playTrack} />;
          })}
        </TrackList>
      </div>
    );
  }
}
