import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Artists.css';

export class Artists extends Component {
  render() {
    const { artists } = this.props;

    return (
      <div className="Artists">
        {artists.map(artist => {
          return (
            <div key={artist.get('id', artist.get('name'))} className="artist">
              {artist.get('uri') ? (
                <Link to={`/artist/${artist.get('id')}`}>
                  {artist.get('name')}
                </Link>
              ) : (
                artist.get('name')
              )}
            </div>
          );
        })}
      </div>
    );
  }
}
