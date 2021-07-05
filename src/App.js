import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/about";
import axios from "axios";

function App(props) {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    setLoading(true);

    async function getUsers() {
      const res = await axios.get("https://api.github.com/users");
      setUsers(res.data);
      setLoading(false);
    }
    getUsers();
  });

  // Search Github users
  const searchUser = async (user) => {
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/search/users?q=${user}`
    );
    setUsers(res.data.items);
    setLoading(false);
  };

  // Get single github user
  const getUser = async (username) => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}`);
    setUser(res.data);
    setLoading(false);
  };

  const handleAlert = (msg, type) => {
    setAlert({ msg, type });

    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <Router>
      <div className="App">
        <Navbar title="GitHub Finder" icon="fa fa-github" />
        <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <React.Fragment>
                  <Search searchUser={searchUser} setAlert={handleAlert} />
                  <Users loading={loading} users={users} />
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/user/:login"
              render={(props) => (
                <User
                  {...props}
                  getUser={getUser}
                  user={user}
                  loading={loading}
                />
              )}
            />
            <Route path="/about" component={About} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
