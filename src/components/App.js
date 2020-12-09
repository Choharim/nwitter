import React,{ useState } from 'react';
import AppRouter from 'components/Router';
import fbase from 'fbase';
import { authService } from 'fbase';

function App() {
  const [ isLoggedIn, setLoggedIn ] = useState(false);
  return <AppRouter isLoggedIn={isLoggedIn}> </AppRouter>;
}

export default App;
