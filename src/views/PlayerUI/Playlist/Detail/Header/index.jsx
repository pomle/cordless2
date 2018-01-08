import React, { Component } from 'react';

import {ViewHeader} from 'components/ViewHeader';

import './Header.css';

export class PlaylistDetailHeader extends Component {
  render() {
    const { playlist } = this.props;
    return <ViewHeader caption={playlist.name} images={playlist.images}/>;
  }
}
