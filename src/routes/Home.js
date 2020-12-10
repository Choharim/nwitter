import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [ nweet, setNweet ] = useState("");
  const [ nweets, setNweets ] = useState([]);

  const getNweets = async() => {
    const dbNweets = await dbService.collection("nweets").get();
    dbNweets.forEach((document) => {
      const nweetObjet = {
        ...document.data(),
        id: document.id
      };
      setNweets((pre) => [nweetObjet, ...pre]);
    });
  };
  useEffect(() => {
    getNweets();
  },[]);

  const onSubmit = async(event) => {
    event.preventDefault();
    await dbService.collection("nweets").add({ 
      nweet,
      createdAt: Date.now() 
    });
    setNweet("");    
  };

  const onChange = (event) => {
    const { target: { value }} = event;
    setNweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={nweet} type="text" placeholder="What's on your mind?" maxLength={120}></input>
        <input type="submit" value="Nweet"></input>
      </form>
      <div>
      {nweets.map((nweet) => (
        <div key={nweet.id}>
          <h4>{nweet.nweet}</h4>
        </div>  
      ))}
      </div>
    </div>
  );
};

export default Home;