import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ApiContext } from "../Context/Api"


const Navbar = () => {

  const { prefix, toggle } = useContext(ApiContext);

  return (
    <div className="nav">
      <div className="nav-item">
        <span className="brand">Recipe Manager</span>
      </div>
      <div className="nav-item">
        <Link to="/" className="nav-item button">
          View Recipes
        </Link>
        <Link to="/new" className="nav-item button">
          Add Recipe
        </Link>
        <div className="nav-item button" onClick={toggle}>
          Switch Backend (Current:<div style={{ marginLeft: '0.25em', color: "#ffc107" }}>{prefix.includes('/p') ? "Python" : "C#"}</div>)
        </div>
      </div>
    </div>
  );
};

export default Navbar;
