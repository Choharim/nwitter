import Nweet from 'components/Nweet';
import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';

const Home = ({ userObj }) => {
  const [ nweet, setNweet ] = useState("");
  const [ nweets, setNweets ] = useState([]);
  const [ attachment, setAttachment ] = useState(); 

  useEffect(() => {  
    dbService.collection("nweets").onSnapshot(snapshot => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id:doc.id,
        ...doc.data()
      }));
      setNweets(nweetArray);
    });
  },[]);

  const onSubmit = async(event) => {
    event.preventDefault();
    await dbService.collection("nweets").add({ 
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid  
    });
    setNweet("");    
  };

  const onChange = (event) => {
    const { target: { value }} = event;
    setNweet(value);
  };

  const onFileChange = (event) => {
    const { target: { files } } = event;
    const theFile = files[0];
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => { 
      const { currentTarget: { result } } = finishedEvent;
      setAttachment(result);
     };

    reader.readAsDataURL(theFile);
  };
  
  const onClearAttachment = () => {
    setAttachment(null);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={nweet} type="text" placeholder="What's on your mind?" maxLength={120}></input>
        <input onChange={onFileChange} type="file" accept="image/*"></input>
        <input type="submit" value="Nweet"></input>
        { attachment && 
          <div>
            <input type="image" src={attachment}></input>
            <button onClick={onClearAttachment}>Clear</button>
          </div> }
      </form>
      <div>
      {nweets.map((nweet) => (
       <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid}></Nweet>
      ))}
      </div>
    </div>
  );
};

export default Home;