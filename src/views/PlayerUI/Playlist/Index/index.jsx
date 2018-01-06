import React, { Component } from 'react';
import { List } from 'immutable';

import { PlaylistList } from 'fragments/PlaylistList';

export class PlaylistIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playlists: new List(),
    };
  }

  componentDidMount() {
    const api = this.props.playlistAPI;
    api.consume(api.getPlaylists(), items => {
      this.setState(prevState => {
        return { playlists: prevState.playlists.push(...items) };
      });
    });
  }

  render() {
    const { player, playbackAPI } = this.props;
    const { playlists } = this.state;

    return (
      <div className="PlaylistIndex">
        <h2>Your Playlists</h2>

        <PlaylistList playlists={playlists} player={player} playbackAPI={playbackAPI}/>
      </div>
    );
  }
}
