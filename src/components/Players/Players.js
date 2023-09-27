import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import Player from "./Player";
import "./Player.css";

import { getTeamPlayerAPI } from "../Api/API";

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
        {players.map(({ player_name }) => {
          return (
            <li key={player_name} className="list-group-item">
              {player_name}
            </li>
          );
        })}
      </ul>
      {/* <ul className="list-group list-group-flush">
            <li className="list-group-item">
              {players[0]}
            </li>
            <li className="list-group-item">
              {players[1]}
            </li>
            <li className="list-group-item">
              {players[2]}
            </li>
            <li className="list-group-item">
              {players[3]}
            </li>
            <li className="list-group-item">
              {players[4]}
            </li>
      </ul> */}
    </div>
  );
}

export default Players;
