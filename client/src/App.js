import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./Components/Navbar";
import RecipieList from "./Components/RecipieList";
import NewRecipie from "./Components/NewRecipie";

import "./styles/style.css";

import ApiProvider from './Context/Api'

function App() {
  return (
    <Router>
      <ApiProvider>
        <Navbar />
        <Switch>
          <Route exact path="/" component={RecipieList} />
          <Route exact path="/new" component={NewRecipie} />
        </Switch>
      </ApiProvider>
    </Router>
  );
}

export default App;
