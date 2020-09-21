import React, { useState } from "react";
import PropTypes from "prop-types";

const RecipieSummary = ({ recipie, onClick }) => {
  const [servings, setServings] = useState(recipie.servings);
  const [time, setTime] = useState();

  const handleChange = (id, value) => {
    clearTimeout(time);
    setTime(setTimeout(() => onClick(id, value), 250));
  };

  return (
    <div
      className="card"
      onClick={() => {
        onClick(recipie.id, servings);
      }}
    >
      <div className="row">
        <span className="bold">{recipie.name}</span>
        <div className="flex-spacer"></div>
        <span
          style={{
            color: recipie.type.includes("Non") ? "#f44336" : "#4caf50",
          }}
        >
          {recipie.type}{" "}
        </span>
        <span style={{ color: "#424242", marginLeft: "0.25em" }}>
          {recipie.category}
        </span>
      </div>
      <div>{recipie.description}</div>
      <div style={{ margin: "0.5em 0" }}>
        <label
          htmlFor={recipie.id}
          className="bold"
          style={{ color: "#424242" }}
        >
          Servings:{" "}
        </label>
        <input
          id={recipie.id}
          type="number"
          value={servings}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => setServings(e.target.value)}
          onInput={(e) => handleChange(recipie.id, e.target.value)}
          min="1"
          className="forminput"
        />
      </div>
    </div>
  );
};

RecipieSummary.propTypes = {
  recipie: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default RecipieSummary;
