import Axios from "./Axios";

async function getAllTeams() {
    try {
      let result = await Axios.get("/teams");
  
      return result;
    } catch (e) {
      return e;
    }
  }

  async function getTeamById(id) {
    try {
      let result = await Axios.get(`/teams/${id}`);
  
      return result;
    } catch (e) {
      return e;
    }
  }

  async function deleteTeamById(id) {
    try {
      let result = await Axios.delete(`/teams/${id}`);
  
      return result;
    } catch (e) {
      return e;
    }
  }
  async function updateTeamById(id, updatedTeam) {
    try {
      let result = await Axios.put(`/teams/${id}`, updatedTeam);
  
      return result;
    } catch (e) {
      return e;
    }
  }
  
  async function createTeam(team) {
    try {
      let result = await Axios.post(`/teams`, team);
  
      return result;
    } catch (e) {
      return e;
    }
  }

//COMMENTS

  async function getTeamCommentAPI(id) {
    try {
      let result = await Axios.get(`/teams/${id}/comments`);
  
      return result;
    } catch (e) {
      return e;
    }
  }
  
  async function createTeamCommentAPI(id, newComment) {
    try {
      let result = await Axios.post(`/teams/${id}/comments`, newComment);
  
      return result;
    } catch (e) {
      return e;
    }
  }
  
  async function updateTeamCommentAPI(id, updatedCommentId, updatedComment) {
    try {
      let result = await Axios.put(
        `/teams/${id}/comments/${updatedCommentId}`,
        updatedComment
      );
  
      return result;
    } catch (e) {
      return e;
    }
  }
  
  async function deleteTeamCommentAPI(id) {
    try {
      let result = await Axios.delete(`/teams/${id}/comments/${id}`);
  
      return result;
    } catch (e) {
      return e;
    }
  }

  //PLAYERS

  async function getallPlayersAPI() {
    try {
      
      let result = await Axios.get(`/players/all-players-list`);
  
      return result;
    } catch (e) {
      return e;
    }
  }
  async function getTeamPlayerAPI(id) {
    try {
        // localhost:3006/teams/1/players/all-players-in-team
      let result = await Axios.get(`/teams/${id}/players`);
  
      return result;
    } catch (e) {
      return e;
    }
  }

  async function getTeamPlayerByIdAPI(teamId, playerId ) {
    try {
      let result = await Axios.get(`/teams/${teamId}/players/${playerId}`);
  
      return result;
    } catch (e) {
      return e;
    }
  }

  //FANTASY
  //create

  async function createPlayersInTeam(formData) {
    try {
      let result = await Axios.post(`/fantasy`, formData);
  
      return result;
    } catch (e) {
      return e;
    }
  }




  export {
    getAllTeams,
    getTeamById,
    deleteTeamById,
    updateTeamById,
    createTeam,
    getTeamCommentAPI,
    createTeamCommentAPI,
    updateTeamCommentAPI,
    deleteTeamCommentAPI,
    getTeamPlayerAPI,
    getTeamPlayerByIdAPI,
    getallPlayersAPI,
    createPlayersInTeam
  };