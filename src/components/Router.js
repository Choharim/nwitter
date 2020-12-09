import React from 'react'; 
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from 'routes/Home';
import Auth from 'routes/Auth';
import Profile from 'routes/Profile';
import Navigation from 'components/Navigation';

const AppRouter = ({isLoggedIn}) => {

  return (
    <Router>
      {isLoggedIn && <Navigation></Navigation>}
      <Switch>
        {isLoggedIn ? 
        <>
        <Route exact path="/">
          <Home></Home>
        </Route> 
        <Route exact path="/profile">
          <Profile></Profile>
        </Route> 
        </>: 
        <Route exact path="/">
          <Auth></Auth>
        </Route>}
      </Switch>
    </Router>
  );
};

export default AppRouter;