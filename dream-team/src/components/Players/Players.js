import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Player from "./Player";
import "./Player.css";

import { getTeamPlayerAPI, getTeamPlayerByIdAPI } from "../Api/API";

const API = process.env.REACT_APP_API_URL;
function Players() {
  const [players, setPlayers] = useState([]);

  let { id } = useParams();

  useEffect(() => {
    fetch();
  }, [id, API]);

  async function fetch() {
    try {
      let result = await getTeamPlayerAPI(id);

      setPlayers(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="player-container">
      {/* <select name="players" >{players.map(({id, player_name})=>{
        return(<option value={player_name}>{player_name}</option>)
      })}</select> */}
      <ul className="list-group list-group-flush">
        {players.slice(0, 5).map(({ id, player_name, position, accolades }) => {
          return (
            <li key={id} className="list-group-item">
              <p>{player_name}{" "}{position}</p>
              <p>{accolades}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Players;
