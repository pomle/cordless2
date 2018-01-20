import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'immutable';

import { QuickSearch } from 'components/QuickSearch';
import { TrackList } from 'fragments/TrackList';
import { Track } from 'fragments/Track';

import { PlaylistDetailHeader } from './Header';

import { fetchPlaylist } from 'layers/PlayerApplication/store/playlist';
import { fetchPlaylistTracks } from 'layers/PlayerApplication/store/playlist-entry';

function matcher(needle) {
  needle = needle.toLowerCase();
  return function match(...haystack) {
    return haystack.some(word => word.toLowerCase().includes(needle));
  };
}

export class PlaylistDetail extends PureComponent {
  static propTypes = {
    playlist: PropTypes.object.isRequired,
    entries: PropTypes.instanceOf(List).isRequired,
    tracks: PropTypes.instanceOf(Map).isRequired,
    fetchPlaylist: PropTypes.func.isRequired,
    fetchPlaylistTracks: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props);

    this.state = {
      filter: '',
    };
  }

  componentWillMount() {
    const { userId, playlistId, fetchPlaylist, fetchPlaylistTracks } = this.props;
    fetchPlaylist(userId, playlistId);
    fetchPlaylistTracks(userId, playlistId);
  }

  getEntries() {
    const { tracks } = this.props;
    const { filter } = this.state;
    console.log(this.props.entries);
    const entries = this.props.entries.map(entry => Object.assign({}, entry, {
      track: tracks.get(entry.track.id),
    }));

    if (filter.length) {
      const match = matcher(filter);
      return entries.filter(entry => {
        const words = [
          entry.track.name,
          ...entry.track.artists.map(artist => artist.name),
          entry.track.album.name,
        ];
        return match(...words);
      });
    }
    return entries;
  }

  playTrack = track => {
    const { userId, playlistId } = this.props;
    this.playbackAPI.playPlaylist(userId, playlistId, track.id);
  };

  updateFilter = filter => {
    this.setState({ filter });
  };

  render() {
    console.log('Render props', this.props);
    const { playlist } = this.props;
    const { filter } = this.state;
    const entries = this.getEntries();

    if (!playlist) {
      return null;
    }

    return (
      <div className="PlaylistDetail">
        <QuickSearch value={filter} onChange={this.updateFilter} />

        <PlaylistDetailHeader playlist={playlist} />

        <TrackList>
          {entries.map(entry => {
            const { track } = entry;
            const key = track.id + entry.added_at;
            return <Track key={key} track={track} play={this.playTrack} />;
          })}
        </TrackList>
      </div>
    );
  }
}

export default connect(
  (state, {playlistId}) => {
    console.log('Connect props', state, playlistId);
    return {
      playlist: state.playlist.getEntry(playlistId),
      entries: state.playlistEntry.getResult(playlistId),
      tracks: state.track.entries,
    };
  },
  {
    fetchPlaylist,
    fetchPlaylistTracks,
  }
)(PlaylistDetail);
