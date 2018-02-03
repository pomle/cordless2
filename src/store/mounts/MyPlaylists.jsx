import { connect } from 'react-redux';
import { MountPoint } from 'store/reducerFactories/stash';

import {reserveItems, setTotal, addItems} from 'store/store/userPlaylists';

const MY = Symbol('my');

function fetch({api}, offset, limit) {
  return api.getMyPlaylists({offset, limit});
}

export default connect(
  (state, props) => ({
    namespace: MY,
    collection: state.userPlaylists.get(MY),
    api: state.session.playlistAPI,
    fetch,
  }),
  {
    reserveItems, setTotal, addItems
  }
)(MountPoint);
