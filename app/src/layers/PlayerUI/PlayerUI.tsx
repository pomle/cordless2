import { Navigation } from "./Navigation";
import { Accenter } from "./Accenter";
import Nav from "./components/Nav";
import Playback from "views/Playback";

import "./Animation.css";
import "./PlayerUI.css";

export default function PlayerUI() {
  return (
    <div className="PlayerUI">
      <Accenter />
      <div className="viewport">
        <nav>
          <Nav />
        </nav>
        <div className="content">
          <Navigation />
        </div>
      </div>

      <div className="playback">
        <Playback />
      </div>
    </div>
  );
}
