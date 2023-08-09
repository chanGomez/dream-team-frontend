import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
    name: "",
    is_favorite: false,
  });

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await getTeamById(id);

        setTeam(response.data);
      } catch (error) {
        navigate("/404");
      }
    };

    fetchTeam();
  }, []);



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
    // setSelectedPlayer({
    //   ...seletedPlayer,
    //   [id]: value,
    // });
  }

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

export default EditTeam;
