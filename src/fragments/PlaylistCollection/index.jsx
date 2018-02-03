import React, { Component } from 'react';
import Yxa from 'components/Yxa';
import { PlaylistList } from 'fragments/PlaylistList';
import { Playlist } from 'fragments/Playlist';

export default class PlaylistCollection extends Component {
  render() {
    return (
      <PlaylistList>
        <Yxa
          collection={this.props.collection}
          fetcher={this.props.fetcher}
          placeholder={<div className="playlist-container"><Playlist /></div>}
          render={playlist => {
            return <div className="playlist-container">
              <Playlist playlist={playlist} />
            </div>
          }}
        />
      </PlaylistList>
    );
  }
}
