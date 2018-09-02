import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { UserIsNotAuthenticated, UserIsAuthenticated } from "./helpers/auth";

import AppNavBar from "./components/layout/AppNavBar";
import Dashboard from "./components/layout/Dashboard";
import AddClient from "./components/clients/AddClient";
import EditClient from "./components/clients/EditClient";
import ClientDetail from "./components/clients/ClientDetail";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import settings from "./components/settings/settings";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <AppNavBar />
            <div className="container">
              <Switch>
                <Route
                  exact
                  path="/"
                  component={UserIsAuthenticated(Dashboard)}
                />
                <Route
                  exact
                  path="/client/add"
                  component={UserIsAuthenticated(AddClient)}
                />
                <Route
                  exact
                  path="/client/edit/:id"
                  component={UserIsAuthenticated(EditClient)}
                />
                <Route
                  exact
                  path="/client/:id"
                  component={UserIsAuthenticated(ClientDetail)}
                />
                <Route
                  exact
                  path="/login"
                  component={UserIsNotAuthenticated(Login)}
                />
                <Route
                  exact
                  path="/register"
                  component={UserIsNotAuthenticated(Register)}
                />
                <Route
                  exact
                  path="/settings"
                  component={UserIsAuthenticated(settings)}
                />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
