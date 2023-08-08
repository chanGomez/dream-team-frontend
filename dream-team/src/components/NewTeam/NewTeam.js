import React from "react";

function NewTeam() {
  return (
    <div>
      <form>
        <div>
          <label>Name</label>
          <input required type="text" name="name" id="name" />
        </div>
        <div> 
          <label>Favorite</label>
          <input required type="checkbox" name="is_favorite" id="is_favorite" />
        </div>
        <button>submit</button>
        <select>
          <option></option>
        </select>
      </form>
    </div>
  );
}

export default NewTeam;
