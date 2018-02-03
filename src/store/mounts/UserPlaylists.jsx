import { Component } from 'react';
import { connect } from 'react-redux';

import {reserveItems, setTotal, addItems} from 'store/store/userPlaylists';

class UserPlaylistsMount extends Component {
  fetch(userId) {
    return (offset, limit) => {
      const {playlistAPI, collection} = this.props;
      if (collection.items.get(offset)) {
        return;
      }

      this.props.reserveItems(userId, offset, limit);

      playlistAPI.getPlaylists(userId, {offset, limit})
      .then(response => {
        this.props.setTotal(userId, response.total);
        this.props.addItems(userId, offset, response.items);
      });
    }
  }

  render() {
    return this.props.render({
      collection: this.props.collection,
      fetcher: this.fetch(this.props.userId),
    });
  }
}

export default connect(
  (state, props) => ({
    collection: state.userPlaylists.get(props.userId),
    playlistAPI: state.session.playlistAPI,
  }),
  {
    reserveItems, setTotal, addItems
  }
)(UserPlaylistsMount);
