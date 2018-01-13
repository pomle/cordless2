import React, { Component } from 'react';
import { List } from 'immutable';

import { QuickSearch } from 'components/QuickSearch';
import { Tracklist } from 'fragments/Tracklist';
import { Track } from 'fragments/Track';

import { PlaylistDetailHeader } from './Header';

function matcher(needle) {
  needle = needle.toLowerCase();
  return function match(...haystack) {
    return haystack.some(word => word.toLowerCase().includes(needle));
  };
}

export class PlaylistDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: '',
      playlist: null,
      tracks: new List(),
    };
  }

  async componentDidMount() {
    const { playlistAPI: api, userId, playlistId } = this.props;

    api.consume(api.getPlaylistTracks(userId, playlistId), items => {
      this.setState(prevState => {
        const filtered = items.filter(entry =>
          entry.track.uri.startsWith('spotify:track:')
        );
        return { tracks: prevState.tracks.push(...filtered) };
      });
    });

    const playlist = await api.getPlaylist(userId, playlistId);
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
    const { playbackAPI, userId, playlistId } = this.props;
    playbackAPI.playPlaylist(userId, playlistId, track.id);
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

        <Tracklist>
          {tracks.map(entry => {
            const { track } = entry;
            const key = track.id + entry.added_at;
            return <Track key={key} track={track} play={this.playTrack} />;
          })}
        </Tracklist>
      </div>
    );
  }
}
