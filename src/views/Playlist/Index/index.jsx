import React, { Component } from 'react';
import { List } from 'immutable';

import { Playlist } from 'fragments/Playlist';

export class PlaylistIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playlists: new List(),
    };
  }

  async componentDidMount() {
    const response = await this.props.playlistAPI.getPlaylists();
    this.setState({
      playlists: new List(response.items),
    });
  }

  render() {
    const { player, playbackAPI } = this.props;
    const { playlists } = this.state;

    return (
      <div className="PlaylistIndex">
        {playlists.map(playlist => {
          return (
            <Playlist
              key={playlist.id}
              playlist={playlist}
              player={player}
              playbackAPI={playbackAPI}
            />
          );
        })}
      </div>
    );
  }
}
