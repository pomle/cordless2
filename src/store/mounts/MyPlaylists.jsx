import { Component } from 'react';
import { connect } from 'react-redux';

import {reserveItems, setTotal, addItems} from 'store/store/userPlaylists';

const MY = Symbol('my');

class MyPlaylistsMount extends Component {
  fetch() {
    return (offset, limit) => {
      const {playlistAPI, collection} = this.props;
      if (collection.items.get(offset)) {
        return;
      }

      this.props.reserveItems(MY, offset, limit);

      playlistAPI.getMyPlaylists({offset, limit})
      .then(response => {
        this.props.setTotal(MY, response.total);
        this.props.addItems(MY, offset, response.items);
      });
    }
  }

  render() {
    return this.props.render({
      collection: this.props.collection,
      fetcher: this.fetch(),
    });
  }
}

export default connect(
  (state, props) => ({
    collection: state.userPlaylists.get(MY),
    playlistAPI: state.session.playlistAPI,
  }),
  {
    reserveItems, setTotal, addItems
  }
)(MyPlaylistsMount);
