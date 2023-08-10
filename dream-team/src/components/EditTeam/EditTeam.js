import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import {
  getTeamById,
  updateTeamById,
  getTeamPlayerAPI,
  getallPlayersAPI,
} from "../Api/API";

function EditTeam() {
  const navigate = useNavigate();
  const { id } = useParams();
  const API = process.env.REACT_APP_API_URL;

  const [pgList, setPgList] = useState([]);
  const [sgList, setSgList] = useState([]);
  const [sfList, setSfList] = useState([]);
  const [pfList, setPfList] = useState([]);
  const [cList, setCList] = useState([]);

  const [team, setTeam] = useState({
    id: 0,
    name: "",
    is_favorite: false,
    "players-sg": 0,
    "players-pg": 0,
    "players-sf": 0,
    "players-pf": 0,
    "players-c": 0,
  });

  const [selectedPlayer, setSelectedPlayer] = useState([]);
  const [teamMembers, setTeamMembers] = useState(false);
  //inistall team info before changes
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await getTeamById(id);
        const responsePlayers = await getTeamPlayerAPI(id);
        let players = responsePlayers.data;
        let pg = players.filter((item) => item.position === "PG");
        let sg = players.filter((item) => item.position === "SG");
        let sf = players.filter((item) => item.position === "SF");
        let pf = players.filter((item) => item.position === "PF");
        let c = players.filter((player) => player.position === "C");

        setTeam({
          ...response.data,
          "players-sg": sg[0].player_id,
          "players-pg": pg[0].player_id,
          "players-sf": sf[0].player_id,
          "players-pf": pf[0].player_id,
          "players-c": c[0].player_id,
        });
      } catch (error) {
        navigate("/404");
      }
    };

    fetchTeam();
    getAllplayers();
    const fetchPlayerInTeam = async () => {
      try {
        const response = await getTeamPlayerAPI(id);

        setSelectedPlayer(response.data);
      } catch (error) {
        navigate("/404");
      }
    };
    //fetchPlayerInTeam();
    // fetch();
  }, [id]);
  let pg = selectedPlayer.filter((item) => item.position === "PG").player_id;
  let sg = selectedPlayer.filter((item) => item.position === "SG").player_id;
  let sf = selectedPlayer.filter((item) => item.position === "SF").player_id;
  let pf = selectedPlayer.filter((item) => item.position === "PF").player_id;
  let c = selectedPlayer.filter((item) => item.position === "C").player_id;

  async function fetch() {
    try {
      let result = await getTeamPlayerAPI(id);
      // console.log(result.data);

      setSelectedPlayer(result.data);
    } catch (error) {
      console.log(error);
    }
  }
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
      setSfList(smallForward);
      setPfList(powerForward);
      setCList(center);
    } catch (error) {
      console.log(error);
    }
  }

  //handle on change
  function handleOnchange(id, value) {
    setTeam({
      ...team,
      [id]: value,
    });
  }
  const handleCheckboxChange = (e) => {
    setTeam({
      ...team,
      is_favorite: !team.is_favorite,
    });
  };

  //handle submit
  const updateTeam = async (id) => {
    try {
      await updateTeamById(id, team);
    } catch (e) {
      console.log(e);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await updateTeam(id);
      navigate(`/teams/${id}`);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="container">
      <h4> Edit Team</h4>
      <form onSubmit={handleSubmit}>
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
            type="checkbox"
            name="is_favorite"
            id="is_favorite"
            onChange={handleCheckboxChange}
            checked={team.is_favorite}
          />
        </div>

        {/* ///////////////////////////////PLAYERS */}

        <h3>Players</h3>

        <p>Point Guard</p>
        <div className="mb-3">
          <select
            name="players-pg"
            required
            id="players-pg"
            onChange={(e) => handleOnchange(e.target.id, e.target.value)}
            value={pg}
          >
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
            name="players-sg"
            required
            id="players-sg"
            value={sg}
            onChange={(e) => handleOnchange(e.target.id, e.target.value)}
          >
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
            name="players-sf"
            required
            id="players-sf"
            value={sf}
            onChange={(e) => handleOnchange(e.target.id, e.target.value)}
          >
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
            name="players-pf"
            required
            id="players-pf"
            value={pf}
            onChange={(e) => handleOnchange(e.target.id, e.target.value)}
          >
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
            name="players-c"
            value={c}
            required
            id="players-c"
            onChange={(e) => handleOnchange(e.target.id, e.target.value)}
          >
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

export default EditTeam;
