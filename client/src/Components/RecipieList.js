import React, { useEffect, useState, useContext } from "react";
import Recipie from "./Recipie";
import RecipieSummary from "./RecipieSummary";
import { ApiContext } from "../Context/Api"
import axios from "axios";

const getRecipes = async (prefix) => {
  const recipies = await axios
    .get(`${prefix}/recipies`)
    .then((response) => response.data);
  return recipies;
};

const getRecipe = async (id, servings, prefix) => {
  const url =
    servings !== ""
      ? `${prefix}/recipies/${id}?servings=${servings}`
      : `${prefix}/api/p/recipies/${id}`;
  const recipe = await axios.get(url).then((response) => response.data);
  return recipe;
};

const RecipieList = () => {

  const { prefix } = useContext(ApiContext);

  const [state, setState] = useState({
    loading: true,
    data: null,
    current: null,
  });

  const setCurrent = (id, servings) => {
    getRecipe(id, servings, prefix)
      .then((recipe) => {
        setState({ ...state, current: recipe });
      })
      .catch((err) => {
        console.error(err);
        alert("The selected recipe could not be fetched at this time");
      });
  };

  useEffect(() => {
    getRecipes(prefix)
      .then((recipies) => {
        setState({ loading: false, data: recipies, current: null });
      })
      .catch((err) => {
        console.error(err);
        alert("There was error in getting recipies !");
      });
  }, [prefix]);

  return !state.loading ? (
    <div className="columns push-navbar">
      <div className="container">
        <div className="heading">Recipes Available</div>
        {state.data.length === 0 && "No Recipies Available, Add a new one !"}
        {state.data.length > 0 && state.data.map((recipie) => (
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
