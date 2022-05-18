import { dbService, storageServie } from "fbInstance";
import React, { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editting, setEditting] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const deleteHandler = async () => {
    await dbService.doc(`nweets/${nweetObj.id}`).delete();
    await storageServie.refFromURL(nweetObj.attachmentUrl).delete();
  };
  const modifyHandler = () => setEditting((prev) => !prev);

  const submitHandler = async (e) => {
    e.preventDefault();
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet,
    });
    setEditting(false);
  };

  return (
    <div>
      {editting ? (
        <>
          <form onSubmit={(e) => submitHandler(e)}>
            <input
              value={newNweet}
              onChange={(e) => setNewNweet(e.target.value)}
              required
            />
            <input type={"submit"} />
          </form>
          <button onClick={() => modifyHandler()}>cancel</button>
        </>
      ) : (
        <div>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && (
            <img src={nweetObj.attachmentUrl} width="50px" height="50px" />
          )}
          {isOwner && (
            <>
              <button onClick={() => deleteHandler()}>Delete Nweet</button>
              <button onClick={() => modifyHandler()}>Modify Nweet</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Nweet;
