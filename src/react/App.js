import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import routes from "./routes";
import Header from "./components/header/headerComponent";
import "./assests/scss/style.scss";

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Switch>
          {routes.map((route, i) => <Route key={i} {...route} />)}
        </Switch>
      </div>
    );
  }
}

export default App;
