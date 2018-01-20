import React, { Component } from 'react';

import { ViewHeader } from 'components/ViewHeader';

import './Header.css';

export class PlaylistDetailHeader extends Component {
  render() {
    const { playlist } = this.props;
    console.log(playlist);
    return <ViewHeader caption={playlist.get('name')} images={playlist.get('images')}/>;
  }
}
