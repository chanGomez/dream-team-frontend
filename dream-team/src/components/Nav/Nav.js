import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

function Nav() {
  return (
    <div className="wrapper">
      <div className="sidebar">
        <nav className="nav flex-column">
          <a className="nav-link" href="#">
            {" "}
            <Link to="/">Home</Link>
          </a>
          <a className="nav-link" href="#">
            {" "}
            <Link to="/teams">Teams</Link>
          </a>
          <a className="nav-link" href="#">
            {" "}
            <Link to="/create-team">New Team</Link>
          </a>
        </nav>
      </div>
    </div>
  );
}

export default Nav;
