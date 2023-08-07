import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Player from "./Player";

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
    <div className="container">
      <ul className="list-group list-group-flush">
        {players.map(({ id, name }) => {
          return (
            <li key={id} className="list-group-item">
              <p>{name}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Players;
