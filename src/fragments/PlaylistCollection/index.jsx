import React, { Component } from 'react';
import CollectionVirtualizer from 'components/CollectionVirtualizer';
import { PlaylistList } from 'fragments/PlaylistList';
import { Playlist } from 'fragments/Playlist';

export default class PlaylistCollection extends Component {
  render() {
    return (
      <PlaylistList>
        <CollectionVirtualizer
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
