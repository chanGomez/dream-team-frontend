import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createTeam, getallPlayersAPI, createPlayersInTeam } from "../Api/API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import "./NewTeam.css";

function NewTeam() {
  const API = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  // const [seletedPlayer, setSelectedPlayer] = useState("");

  const [team, setTeam] = useState({
    team_id: 0,
    name: "",
    is_favorite: false,
    "players-sg": "",
    "players-pg": "",
    "players-sf": "",
    "players-pf": "",
    "players-c": "",
  });

  const [pgList, setPgList] = useState([]);
  const [sgList, setSgList] = useState([]);
  const [sfList, setSfList] = useState([]);
  const [pfList, setPfList] = useState([]);
  const [cList, setCList] = useState([]);

  async function handleCreateTeam(e) {
    e.preventDefault();
    try {
      let resultTeam = await createTeam(team);
      const positions = ["sg", "pg", "sf", "c", "pf"];
      for (let x = 0; x < positions.length; x++) {

        await createPlayersInTeam({fantasy: [ resultTeam.data[0].id, team["players-" + positions[x]] ]});

        }

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
    // setSelectedPlayer({
    //   ...seletedPlayer,
    //   [id]: value,
    // });
  }

  //get players in select menu
  useEffect(() => {
    async function getAllplayers() {
      try {
        let result = await getallPlayersAPI();

        let pointGuards = result.data.filter((item) => item.position === "PG");
        let shootingGuards = result.data.filter(
          (item) => item.position === "SG"
        );
        let smallForward = result.data.filter((item) => item.position === "SF");
        let powerForward = result.data.filter((item) => item.position === "PF");
        let center = result.data.filter((item) => item.position === "C");

        setPgList(pointGuards);
        setSgList(shootingGuards);
        setSfList(smallForward);
        setPfList(powerForward);
        setCList(center);
      } catch (error) {
        console.log(error);
      }
    }
    getAllplayers();
  }, [API]);

  //create/add players in team
  // async function addPlayersInTeam() {
  //   try {
  //     let result = await createPlayersInTeam();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

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

        <p>Point Guard</p>
        <div className="mb-3">
          <select
            id="players-pg"
            value={team["players-pg"]}
            onChange={(e) => handleOnchange(e.target.id, e.target.value)}
            name="players-pg"
          >
            <option>Please select a Player</option>
            {pgList.map(({ id, player_name }) => {
              return (
                <option key={id} value={id}>
                  {player_name}
                </option>
              );
            })}
          </select>
        </div>
        <p>Shooting Guard</p>
        <div className="mb-3">
          <select
            id="players-sg"
            value={team["players-sg"]}
            onChange={(e) => handleOnchange(e.target.id, e.target.value)}
            name="players-sg"
          >
            <option>Please select a Player</option>
            {sgList.map(({ id, player_name }) => {
              return (
                <option key={id} value={id}>
                  {player_name}
                </option>
              );
            })}
          </select>
        </div>
        <p>Small Forward</p>
        <div className="mb-3">
          <select
            id="players-sf"
            value={team["players-sf"]}
            onChange={(e) => handleOnchange(e.target.id, e.target.value)}
            name="players-sf"
          >
            <option>Please select a Player</option>
            {sfList.map(({ id, player_name }) => {
              return (
                <option key={id} value={id}>
                  {player_name}
                </option>
              );
            })}
          </select>
        </div>
        <p>Power Forward</p>
        <div className="mb-3">
          <select
            id="players-pf"
            value={team["players-pf"]}
            onChange={(e) => handleOnchange(e.target.id, e.target.value)}
            name="players-pf"
          >
            <option>Please select a Player</option>
            {pfList.map(({ id, player_name }) => {
              return (
                <option key={id} value={id}>
                  {player_name}
                </option>
              );
            })}
          </select>
        </div>
        <p>Center</p>
        <div className="mb-3">
          <select
            id="players-c"
            value={team["players-c"]}
            onChange={(e) => handleOnchange(e.target.id, e.target.value)}
            name="players-c"
          >
            <option>Please select a Player</option>
            {cList.map(({ id, player_name }) => {
              return (
                <option key={id} value={id}>
                  {player_name}
                </option>
              );
            })}
          </select>
        </div>

        <button>Submit</button>
      </form>

      <span>
        <FontAwesomeIcon
          icon={faArrowAltCircleLeft}
          onClick={() => navigate("/teams")}
          style={{ fontSize: "25px" }}
        />
      </span>
    </div>
  );
}

export default NewTeam;
