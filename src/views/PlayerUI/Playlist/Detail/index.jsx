import React, { Component } from 'react';
import { List } from 'immutable';

import {Track} from 'fragments/Track';

export class PlaylistDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tracks: new List(),
    };
  }

  componentDidMount() {
    const { playlistAPI: api, userId, playlistId } = this.props;
    api.consume(api.getPlaylistTracks(userId, playlistId), items => {
      this.setState(prevState => {
        return { tracks: prevState.tracks.push(...items) };
      });
    });
  }

  render() {
    const { tracks } = this.state;

    return (
      <div className="PlaylistDetail">
        {tracks.map(entry => {
          const {track} = entry;
          const key = track.id + entry.added_at;
          return <Track key={key} track={track}/>;
        })}
      </div>
    );
  }
}
