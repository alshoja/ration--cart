import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Authentication/Login';
import Home from './components/Home';
import PrivateRoute from './components/Common/privateRoute';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { UserContext } from './context/user';
import { setAxiosIntercepts } from './services/axios';

const App = () => {
  const existingToken = JSON.parse(localStorage.getItem('token'));
  const existingEmail = JSON.parse(localStorage.getItem('email'));
  const [authToken, setAuthToken] = useState(existingToken);
  const [authEmail, setAuthEmail] = useState(existingEmail);

  const setCredentials = (email, token) => {
    localStorage.setItem('token', JSON.stringify(token));
    setAuthToken(token);
    localStorage.setItem('email', JSON.stringify(email));
    setAuthEmail(authEmail);
  };

  useEffect(() => {
    setAxiosIntercepts();
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={{ authToken, setCredentials }}>
        <Router>
          <Switch>
            <Route
              exact
              path="/login"
              component={props => <Login {...props} />}
            />
            {/* <Route exact path="/signup" component={Signup} /> */}
            <PrivateRoute
              path="/"
              redirectRoute="/login"
              component={Home}
              condition={!!authToken}
            />
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
};

export default App;
