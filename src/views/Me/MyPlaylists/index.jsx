import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Record, List } from 'immutable';

import { PlaylistList } from 'fragments/PlaylistList';
//import { PlaylistIndex } from 'fragments/PlaylistIndex';

const ItemSet = Record({
  total: null,
  items: new List(),
});


class MyPlaylistsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playlistSet: new ItemSet(),
    };
  }

  componentWillMount() {
    this.onUpdate(this.props);
  }

  async onUpdate({ playlistAPI }) {
    const responses = await Promise.all([
      playlistAPI.getMyPlaylists({limit: 50, offset: 0}),
      playlistAPI.getMyPlaylists({limit: 50, offset: 50}),
    ]);

    const items = [].concat(responses[0].items, responses[1].items, responses[1].items, responses[1].items, responses[1].items, responses[1].items, responses[1].items);

    this.setState(({playlistSet}) => {
      return {
        playlistSet: playlistSet
          .set('total', items.length)
          .set('items', playlistSet.items.merge(items)),
      };
    });
  }

  render() {
    return (
      <PlaylistList
        playlists={this.state.playlistSet}
      />
    );
  }
}

export default connect(
  (state, props) => {
    return {
      playlistAPI: state.session.playlistAPI,
    };
  }
)(MyPlaylistsView);
