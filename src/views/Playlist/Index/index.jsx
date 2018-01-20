import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Iterable } from 'immutable';

import { PlaylistIndex } from 'fragments/PlaylistIndex';
import { fetchUserPlaylists } from 'store/player/playlist';

const ME = Symbol('default user');

class PlaylistView extends Component {
  static defaultProps = {
    userId: ME,
  };

  static propTypes = {
    userId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.symbol,
    ]),
    playlists: PropTypes.instanceOf(Iterable).isRequired,
  };

  componentWillMount() {
    this.onUpdate(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.onUpdate(nextProps);
  }

  onUpdate({ userId, fetch }) {
    if (this.userId === userId) {
      return;
    }

    this.userId = userId;

    fetch(userId === ME ? undefined : userId);
  }

  render() {
    return (
      <PlaylistIndex
        caption="Your Playlists"
        playlists={this.props.playlists}
      />
    );
  }
}

export default connect(
  (state, props) => {
    return {
      playlists: state.playlist.getEntries(props.userId),
    };
  },
  {
    fetch: fetchUserPlaylists,
  }
)(PlaylistView);
