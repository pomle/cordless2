import React, { Component } from 'react';
import { List } from 'immutable';

import {Tracklist} from 'fragments/Tracklist';
import {Track} from 'fragments/Track';

import {PlaylistDetailHeader} from './Header';

export class PlaylistDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playlist: null,
      tracks: new List(),
    };
  }

  async componentDidMount() {
    const { playlistAPI: api, userId, playlistId } = this.props;

    api.consume(api.getPlaylistTracks(userId, playlistId), items => {
      this.setState(prevState => {
        return { tracks: prevState.tracks.push(...items) };
      });
    });

    const playlist = await api.getPlaylist(userId, playlistId);
    this.setState({playlist});
  }

  playTrack = (track) => {
    const { playbackAPI, player } = this.props;
    const trackURIs = this.state.tracks.map(entry => entry.track.uri);
    playbackAPI.playTracks(trackURIs, track.uri, player.deviceId);
  }

  render() {
    const { playlist, tracks } = this.state;

    if (!playlist) {
      return null;
    }

    return (
      <div className="PlaylistDetail">
        <PlaylistDetailHeader playlist={playlist}/>

        <Tracklist>
          {tracks.map(entry => {
            const {track} = entry;
            const key = track.id + entry.added_at;
            return <Track key={key} track={track} play={this.playTrack} />;
          })}
        </Tracklist>
      </div>
    );
  }
}
