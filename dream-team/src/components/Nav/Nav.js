import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

function Nav() {
  return (
    <div className="wrapper">
      <div className="sidebar">
        <nav className="nav flex-column">

            <Link className="nav-link" to="/">Home</Link>

            <Link className="nav-link" to="/teams">Teams</Link>

            <Link className="nav-link" to="/create-team">New Team</Link>
        </nav>
      </div>
    </div>
  );
}

export default Nav;
