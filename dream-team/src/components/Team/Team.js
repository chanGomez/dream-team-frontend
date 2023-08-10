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
      <div className="container">
      {team && (
        <div>
          <span className="flex">
            <h1> {team.name} </h1>
            {team.is_favorite ? (
              <div className="star">
                <FontAwesomeIcon
                  icon={faStarHalfStroke}
                  style={{ fontSize: "21px" }}
                />
              </div>
            ) : (
              ""
            )}
          </span>

          <Players />
          <span className="button-group">
          <FontAwesomeIcon
            icon={faArrowAltCircleLeft}
            onClick={() => navigate("/teams")}
            style={{ fontSize: "25px" }}
          />
          <FontAwesomeIcon
            icon={faTrashCan}
            onClick={() => deleteTeam()}
            style={{ fontSize: "25px" }}
          />
          <Link to={`/teams/${id}/edit`}
          className="link">
            {" "}
            <FontAwesomeIcon
              icon={faPenToSquare}
              style={{ fontSize: "25px" }}
            />
          </Link>

          </span>
        </div>
      )}

      </div>

      <br />
      <h3> Trash Talk</h3>
      <Comments />
    </div>
  );
}

export default Team;
