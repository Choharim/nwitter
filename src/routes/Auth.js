import React, { useState } from 'react';
import { authService } from 'fbase';

const Auth = () => {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ newAccount, setNewAccount ] = useState(true);
  const [ error, setError ] = useState("");

  const onChange = (event) => {
    const { target: { name , value } } = event;

    if(name === "email"){
      setEmail(value);
    } else if(name === "password"){
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
   try {
     let data;
      if(newAccount){
        data = await authService.createUserWithEmailAndPassword(email, password);
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error){
      setError(error);
    }
  };

  const toggleAccount = () => {
    setNewAccount((pre) => !pre );
  };

  return (
  <div>
    <form onSubmit={onSubmit}>
      <input onChange={onChange} name="email" type="email" placeholder="Email" required value={email}></input>
      <input onChange={onChange} name="password" type="password" placeholder="Password" required value={password}></input>
      <input type="submit" value={newAccount ? "Create Account" : "Sign In"}></input>
      {error}
    </form>
    <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
    <div>
      <button>Continue with Google</button>
      <button>Continue with Github</button>
    </div>
  </div>
  );
};

export default Auth;