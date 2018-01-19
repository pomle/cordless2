import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import { QuickSearch } from 'components/QuickSearch';
import { ViewHeader } from 'components/ViewHeader';
import { PlaylistList } from 'fragments/PlaylistList';

export class PlaylistIndex extends Component {
  static propTypes = {
    caption: PropTypes.string.isRequired,
    playlists: PropTypes.instanceOf(List),
  };

  constructor(props, context) {
    super(props);

    this.state = {
      filter: '',
    };
  }

  filter(playlists) {
    const { filter } = this.state;

    if (filter.length) {
      return playlists.filter(playlist => playlist.name.includes(filter));
    }

    return playlists;
  }

  updateFilter = filter => {
    this.setState({ filter });
  };

  render() {
    const { playlists, caption } = this.props;
    const { filter } = this.state;

    return (
      <div className="PlaylistIndex">
        <QuickSearch value={filter} onChange={this.updateFilter} />

        <ViewHeader caption={caption} />

        <PlaylistList playlists={this.filter(playlists)} />
      </div>
    );
  }
}
