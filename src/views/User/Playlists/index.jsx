import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Record, List, fromJS } from 'immutable';

import ViewportDetector from 'components/ViewportDetector';
import { PlaylistList } from 'fragments/PlaylistList';
import { Playlist } from 'fragments/Playlist';

const ItemSet = Record({
  total: null,
  items: new List(),
});

const PAGE_LEN = 50;

class UserPlaylistsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playlistSet: new ItemSet(),
    };

    this.offsetsFulfilled = new Set();
  }

  componentWillMount() {
    this.onUpdate(this.props);
  }

  onUpdate() {
    this.fetch();
  }

  async fetch(offset = 0, limit = PAGE_LEN) {
    const { userId, playlistAPI } = this.props;

    if (this.offsetsFulfilled.has(offset)) {
      console.log(`Not fetching offset ${offset} again`);
      return;
    }

    this.offsetsFulfilled.add(offset);

    console.log(`Fetching offset ${offset}`);
    const response = await playlistAPI.getPlaylists(userId, {offset, limit});
    console.log('Response total', response.total);

    this.setState(({playlistSet}) => {
      return {
        playlistSet: playlistSet
          .set('total', response.total)
          .set('items', playlistSet.items.withMutations(items => {
            response.items.forEach((playlist, index) => {
              const position = index + offset;
              items.set(position, fromJS(playlist));
            })
            return items;
          })),
      };
    });
  }

  onMissing = (missing) => {
    const first = missing[0];
    const last = missing[missing.length - 1];

    let offset = first - (first % PAGE_LEN);
    const offsets = [];
    while (offset < last) {
      offsets.push(offset);
      offset += PAGE_LEN;
    }

    offsets.forEach(offset => this.fetch(offset));
  }

  render() {
    const {playlistSet} = this.state;

    return (
      <PlaylistList>
        <ViewportDetector
          count={playlistSet.total || 0}
          items={playlistSet.items}
          onMissing={this.onMissing}
          onDraw={playlist => {
            return <Playlist playlist={playlist} />
          }}
        />
      </PlaylistList>
    );
  }
}

export default connect(
  (state, props) => {
    return {
      playlistAPI: state.session.playlistAPI,
    };
  }
)(UserPlaylistsView);
