import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStarHalfStroke,
  faArrowAltCircleLeft,
  faTrashCan,
  faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";
import "./Team.css";

import Comments from "../Comments/Comments";
import Players from "../Players/Players";
import { getTeamById, deleteTeamById } from "../Api/API";

function Team() {
  const [team, setTeam] = useState(null);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    toFetchTeamById();
  }, []);

  async function toFetchTeamById() {
    try {
      let result = await getTeamById(id);

      setTeam(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteTeam = async () => {
    try {
      const response = await deleteTeamById(id);

      const { name } = response.data;
      alert(`Team ${name} has been deleted`);
      navigate("/Teams");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {team && (
        <div>
          <span className="flex">
            <h1> {team.name} </h1>
            {team.is_favorite ? (
              <div className="star">
                <FontAwesomeIcon icon={faStarHalfStroke} />
              </div>
            ) : (
              ""
            )}
          </span>

          <Players />
          <FontAwesomeIcon
            icon={faArrowAltCircleLeft}
            onClick={() => navigate("/teams")}
          />
          <FontAwesomeIcon icon={faTrashCan} onClick={() => deleteTeam()} />
          <Link to={`/teams/${id}/edit`}>
            {" "}
            <FontAwesomeIcon icon={faPenToSquare} style={{ fontSize: "45px" }} />
          </Link>
        </div>
      )}

      <br />
      <h3> Trash Talk</h3>
      <Comments />
    </div>
  );
}

export default Team;
