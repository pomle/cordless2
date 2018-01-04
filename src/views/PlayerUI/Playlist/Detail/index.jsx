import React, { Component } from 'react';
import { List } from 'immutable';

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
        {tracks.map(track => {
          console.log(track);
          return <div key={track.id}>A</div>;
        })}
      </div>
    );
  }
}
