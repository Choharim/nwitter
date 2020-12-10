import React,{ useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import firebase from 'fbase';
import { authService } from 'fbase';

function App() {
  const [ init, setInit ] = useState(false);
  const [ isLoggedIn, setLoggedIn ] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setLoggedIn(true);
      }else {
        setLoggedIn(false);
      }
      setInit(true);
    }); 
  },[]);

  return (
  <>
    {init ? <AppRouter isLoggedIn={isLoggedIn}></AppRouter> : "Initializing..."}
  </>);
}

export default App;
