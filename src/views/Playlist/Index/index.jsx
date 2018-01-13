import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import { QuickSearch } from 'components/QuickSearch';
import { ViewHeader } from 'components/ViewHeader';
import { PlaylistList } from 'fragments/PlaylistList';

export class PlaylistIndex extends Component {
  static contextTypes = {
    api: PropTypes.object,
  };

  constructor(props, context) {
    super(props);

    this.api = context.api.playlistAPI;

    this.state = {
      filter: '',
      playlists: new List(),
    };
  }

  componentDidMount() {
    this.api.consume(this.api.getPlaylists(), items => {
      this.setState(prevState => {
        return { playlists: prevState.playlists.push(...items) };
      });
    });
  }

  getPlaylists() {
    let { filter, playlists } = this.state;
    if (filter.length) {
      playlists = playlists.filter(playlist => playlist.name.includes(filter));
    }
    return playlists;
  }

  updateFilter = filter => {
    this.setState({ filter });
  };

  render() {
    const { player } = this.props;
    const { filter } = this.state;

    return (
      <div className="PlaylistIndex">
        <QuickSearch value={filter} onChange={this.updateFilter} />

        <ViewHeader caption="Your Playlists" />

        <PlaylistList
          playlists={this.getPlaylists()}
          player={player}
        />
      </div>
    );
  }
}
