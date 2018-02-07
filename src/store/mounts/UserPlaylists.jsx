import { connect } from 'react-redux';
import { MountPoint } from 'store/reducerFactories/stash';

import {reserveItems, setTotal, addItems} from 'store/store/userPlaylists';

function fetch({api, userId}, offset, limit) {
  return api.getPlaylists(userId, {offset, limit});
}

export default connect(
  (state, {userId}) => ({
    namespace: userId,
    collection: state.userPlaylists.get(userId),
    api: state.session.playlistAPI,
    fetch,
  }),
  {
    reserveItems, setTotal, addItems
  }
)(MountPoint);
