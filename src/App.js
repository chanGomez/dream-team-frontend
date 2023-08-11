import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import NewTeam from "./components/NewTeam/NewTeam";
import EditTeam from "./components/EditTeam/EditTeam";
import Teams from "./components/Teams/Teams";
import Team from "./components/Team/Team";
import Nav from "./components/Nav/Nav";
import './App.css';

function App() {
  return (
    <div className="App">
            <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/teams" element={<Teams/>} />
          <Route path="/teams/:id" element={<Team/>} />
          <Route path="/teams/:id/edit" element={<EditTeam/>} />
          <Route path="/create-team" element={<NewTeam/>} />
          <Route path="/404" element={<h1>404 Not found!</h1>} />
          <Route path="*" element={<h1>404 Not found!</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
