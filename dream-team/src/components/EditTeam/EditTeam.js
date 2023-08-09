import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTeamById, updateTeamById, getTeamPlayerAPI } from "../Api/API";

function EditTeam() {
  // const navigate = useNavigate();
  // const { id } = useParams();

  // const [team, setTeam] = useState({
  //   name: "",
  //   is_favorite: false,
  // });

  // useEffect(() => {
  //   const fetchTeam = async () => {
  //     try {
  //       const response = await getTeamById(id);

  //       setTeam(response.data);
  //     } catch (error) {
  //       navigate("/404");
  //     }
  //   };

  //   fetchTeam();
  // }, []);

  return (
    <div>EditTeam</div>
  )
}

export default EditTeam