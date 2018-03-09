import React, { Component } from 'react';
import CollectionVirtualizer from 'components/CollectionVirtualizer';
import { PlaylistList } from 'fragments/PlaylistList';
import { Playlist } from 'fragments/Playlist';

const PLACEHOLDER = <div className="playlist-container">
  <div class="placeholder"/>
</div>;

function renderer(playlist) {
  return <div className="playlist-container">
    <Playlist playlist={playlist} />
  </div>;
}

export default class PlaylistCollection extends Component {
  render() {
    return (
      <PlaylistList>
        <CollectionVirtualizer
          collection={this.props.collection}
          fetcher={this.props.fetcher}
          placeholder={PLACEHOLDER}
          render={renderer}
        />
      </PlaylistList>
    );
  }
}
