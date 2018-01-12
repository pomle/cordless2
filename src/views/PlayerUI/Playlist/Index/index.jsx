import React, { Component } from 'react';
import { List } from 'immutable';

import { QuickSearch } from 'components/QuickSearch';
import { ViewHeader } from 'components/ViewHeader';
import { PlaylistList } from 'fragments/PlaylistList';

export class PlaylistIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: '',
      playlists: new List(),
    };
  }

  componentDidMount() {
    const api = this.props.playlistAPI;
    api.consume(api.getPlaylists(), items => {
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
    const { player, playbackAPI } = this.props;
    const { filter } = this.state;

    return (
      <div className="PlaylistIndex">
        <QuickSearch value={filter} onChange={this.updateFilter} />

        <ViewHeader caption="Your Playlists" />

        <PlaylistList
          playlists={this.getPlaylists()}
          player={player}
          playbackAPI={playbackAPI}
        />
      </div>
    );
  }
}
