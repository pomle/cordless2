import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as HomeIcon } from "./assets/house.svg";
import { ReactComponent as SearchIcon } from "./assets/magnifier.svg";
import { ReactComponent as PlaylistIcon } from "./assets/list.svg";
import { ReactComponent as PlayIcon } from "./assets/play.svg";
import { ReactComponent as StatsIcon } from "./assets/stats.svg";

import "./Nav.css";

export default function Nav() {
  return (
    <div className="Nav">
      <ul>
        <li>
          <HomeIcon width={16} height={16} />
          <Link to="/">Home</Link>
        </li>
        <li>
          <SearchIcon width={16} height={16} />
          <Link to="/search">Search</Link>
        </li>
        <li>
          <PlaylistIcon width={16} height={16} />
          <Link to="/playlists">Playlists</Link>
        </li>
        <li>
          <PlayIcon width={16} height={16} />
          <Link to="/now-playing">Now Playing</Link>
        </li>
        <li>
          <StatsIcon width={16} height={16} />
          <Link to="/track-info">Stats</Link>
        </li>
      </ul>
    </div>
  );
}
