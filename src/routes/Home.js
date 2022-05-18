import Nweet from "components/Nweet";
import NweetForm from "components/NweetForm";
import React, { useEffect, useState } from "react";
import { dbService } from "fbInstance";

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);
  const user = userObj;

  useEffect(() => {
    dbService.collection("nweets").onSnapshot((snapshot) => {
      const nweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArr);
    });
  }, []);

  return (
    <div>
      <NweetForm userObj={user} />
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === user.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
