import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Teams.css";

import { getAllTeams } from "../Api/API";

function Teams() {
  const [teamsData, setTeamsData] = useState([]);

  async function fetchTeamsdata() {
    try {
      let result = await getAllTeams();
      console.log(result.data);
      setTeamsData(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTeamsdata();
  }, []);

  function showData() {
    return (
      <ul className="list-group list-group-flush">
        {teamsData.map(({ id, name }) => {
          return (
            <li key={id} className="list-group-item">
              <Link to={`/teams/${id}`} className="link">
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className="container">
      <h1> YOUR FANTASY DRAFTS </h1>
      <br />
      <div>
        {teamsData.length === 0 ? (
          <div>Please go create some teams</div>
        ) : (
          showData()
        )}
      </div>
    </div>
  );
}

export default Teams;
