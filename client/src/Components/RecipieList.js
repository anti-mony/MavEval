import React, { useEffect, useState } from "react";
import Recipie from "./Recipie";
import RecipieSummary from "./RecipieSummary";
import axios from "axios";

const getRecipes = async () => {
  const recipies = await axios
    .get("/api/p/recipies")
    .then((response) => response.data.data);
  return recipies;
};

const getRecipe = async (id, servings) => {
  const url =
    servings !== ""
      ? `/api/p/recipies/${id}?servings=${servings}`
      : `/api/p/recipies/${id}`;
  const recipe = await axios.get(url).then((response) => response.data);
  return recipe;
};

const RecipieList = () => {
  const [state, setState] = useState({
    loading: true,
    data: null,
    current: null,
  });

  const setCurrent = (id, servings) => {
    getRecipe(id, servings)
      .then((recipe) => {
        setState({ ...state, current: recipe.data });
      })
      .catch((err) => {
        console.error(err);
        alert("The selected recipe could not be fetched at this time");
      });
  };

  useEffect(() => {
    getRecipes()
      .then((recipies) => {
        setState({ loading: false, data: recipies, current: null });
      })
      .catch((err) => {
        console.error(err);
        alert("There was error in getting recipies !");
      });
  }, []);

  return !state.loading ? (
    <div className="columns push-navbar">
      <div className="container">
        <div className="heading">Recipes Available</div>

        {state.data.map((recipie) => (
          <RecipieSummary
            recipie={recipie}
            key={recipie.id}
            onClick={setCurrent}
          />
        ))}
      </div>
      <div className="container">
        <div className="heading">Recipe Selected</div>
        {state.current ? (
          <Recipie recipe={state.current} />
        ) : (
            "Nothing selected right now :D"
          )}
      </div>
    </div>
  ) : (
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
    );
};

export default RecipieList;
