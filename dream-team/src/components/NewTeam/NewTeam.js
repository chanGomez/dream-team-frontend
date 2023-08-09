import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTeam, getallPlayersAPI } from "../Api/API";
import "./NewTeam.css";

function NewTeam() {
  const API = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const [team, setTeam] = useState({
    name: "",
    is_favorite: false,
  });

  const [pgList, setPgList] = useState([]);
  const [sgList, setSgList] = useState([]);
  const [sfList, setSfList] = useState([]);
  const [pfList, setPfList] = useState([]);
  const [cList, setCList] = useState([]);

  const [seletedPlayer, setSelectedPlayer] = useState("");

  async function handleCreateTeam(e) {
    e.preventDefault();
    try {
      await createTeam(team);
      setTeam({
        name: "",
        is_favorite: false,
      });
      navigate("/teams");
    } catch (e) {
      console.log(e);
    }
  }
  function handleOnchange(id, value) {
    setTeam({
      ...team,
      [id]: value,
    });
    setSelectedPlayer({
      ...seletedPlayer,
      [id]: value,
    });
  }

  //get players in select menu
  useEffect(() => {
    getAllplayers();
  }, [API]);

  async function getAllplayers() {
    try {
      let result = await getallPlayersAPI();

      let pointGuards = result.data.filter((item) => item.position === "PG");
      let shootingGuards = result.data.filter((item) => item.position === "SG");
      let smallForward = result.data.filter((item) => item.position === "SF");
      let powerForward = result.data.filter((item) => item.position === "PF");
      let center = result.data.filter((item) => item.position === "C");

      setPgList(pointGuards);
      setSgList(shootingGuards);
      setSfList(smallForward)
      setPfList(powerForward)
      setCList(center)
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <h4> New Team</h4>
      <form onSubmit={handleCreateTeam}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            className="form-control"
            required
            type="text"
            name="name"
            id="name"
            onChange={(e) => handleOnchange(e.target.id, e.target.value)}
            value={team.name}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Favorite</label>
          <input
            className="form-control"
            required
            type="checkbox"
            name="is_favorite"
            id="is_favorite"
            onChange={(e) => handleOnchange(e.target.id, e.target.checked)}
            value={team.is_favorite}
          />
        </div>

        <h3>Players</h3>
        {/* <div className="mb-3">
          <label className="form-label">player 1</label>
          <input
            className="form-control"
            required
            type="select"
            name="is_favorite"
            id="player"
            onChange={(e) => handleOnchange(e.target.id, e.target.checked)}
            value={playersList}
          />
        </div> */}
        <p>player 1</p>
        <div className="mb-3">
          <select name="players">
            <option value="">Please select a Player</option>
            {pgList.map(({ id, player_name }) => {
              return (
                <option key={id} value={player_name}>
                  {player_name}
                </option>
              );
            })}
          </select>
        </div>
        <p>player 2</p>
        <div className="mb-3">
          <select name="players">
            <option value="">Please select a Player</option>
            {sgList.map(({ id, player_name }) => {
              return (
                <option key={id} value={player_name}>
                  {player_name}
                </option>
              );
            })}
          </select>
        </div>
        <p>player 3</p>
        <div className="mb-3">
          <select name="players">
            <option value="">Please select a Player</option>
            {sfList.map(({ id, player_name }) => {
              return (
                <option key={id} value={player_name}>
                  {player_name}
                </option>
              );
            })}
          </select>
        </div>
        <p>player 4</p>
        <div className="mb-3">
          <select name="players">
            <option value="">Please select a Player</option>
            {pfList.map(({ id, player_name }) => {
              return (
                <option key={id} value={player_name}>
                  {player_name}
                </option>
              );
            })}
          </select>
        </div>
        <p>player 5</p>
        <div className="mb-3">
          <select name="players">
            <option value="">Please select a Player</option>
            {cList.map(({ id, player_name }) => {
              return (
                <option key={id} value={player_name}>
                  {player_name}
                </option>
              );
            })}
          </select>
        </div>

        <button>Submit</button>
      </form>
    </div>
  );
}

export default NewTeam;
