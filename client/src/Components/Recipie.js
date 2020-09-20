import React from "react";
import PropTypes from "prop-types";

const Recipie = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <div className="heading item">{recipe.name}</div>
      <div className="item">{recipe.description}</div>
      <div className="item">
        <span className="label">Type: </span>
        <span
          style={{
            color: recipe.type.includes("Non") ? "#f44336" : "#4caf50",
          }}
        >
          {recipe.type}{" "}
        </span>
        <span style={{ marginLeft: "0.25em" }}>{recipe.category}</span>
      </div>
      <div className="item">
        <span className="label">Prepration Time: </span>
        <span>{recipe.preptime} minutes</span>
      </div>
      <div className="item">
        <span className="label">Servings: </span>
        <span>{recipe.servings}</span>
      </div>
      <div className="item">
        <span className="label">Calories per serving: </span>
        <span>{recipe.calories}</span>
      </div>
      <div className="item">
        <div className="label item">Ingredients: </div>
        <div>
          {recipe.ingredients.map((item, index) => (
            <div key={index} className="item">
              <span>{index}. </span>
              <span style={{ fontStyle: "italic" }}>{item.name}: </span>
              <span>{item.quantity.toFixed(2)} </span>
              <span>{item.unit}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="item">
        <div className="label">Instructions: </div>
        <div>{recipe.instructions}</div>
      </div>
    </div>
  );
};

Recipie.propTypes = {
  recipe: PropTypes.object.isRequired,
};

export default Recipie;
