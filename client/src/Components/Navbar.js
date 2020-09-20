import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
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
      </div>
    </div>
  );
};

export default Navbar;
