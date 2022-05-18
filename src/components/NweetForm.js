import React, { useState } from "react";
import { dbService, storageServie } from "fbInstance";
import { v4 as uuidv4 } from "uuid";

const NweetForm = ({ userObj }) => {
  const [attachment, setAttachment] = useState();
  const [nweet, setNweet] = useState("");
  const user = userObj;

  const onSubmit = async (e) => {
    e.preventDefault();
    let attachmentUrl = "";
    if (attachment) {
      const fileRef = storageServie.ref().child(`${user.uid}/${uuidv4()}`);
      const res = await fileRef.putString(attachment, "data_url");
      attachmentUrl = await res.ref.getDownloadURL();
    }
    const nweetObj = {
      text: nweet,
      createAt: Date.now(),
      creatorId: user.uid,
      attachmentUrl,
    };
    await dbService.collection("nweets").add(nweetObj);
    setNweet("");
    setAttachment(null);
  };

  const onFileChange = (e) => {
    const reader = new FileReader();
    const tempFile = e.target.files[0];
    reader.onloadend = (e) => {
      setAttachment(e.currentTarget.result);
    };
    reader.readAsDataURL(tempFile);
  };

  return (
    <form>
      <input
        type="text"
        placeholder="Waht's on your mind?"
        maxLength={120}
        value={nweet}
        onChange={(e) => {
          setNweet(e.target.value);
        }}
      />
      <input type="file" accept="image/*" onChange={(e) => onFileChange(e)} />
      <input
        type={"submit"}
        value="Nweet"
        onClick={(e) => {
          onSubmit(e);
        }}
      />
      {attachment && (
        <div>
          <img src={attachment} width="50px" height="50px" />
          <button onClick={() => setAttachment(null)}>Clear</button>
        </div>
      )}
    </form>
  );
};

export default NweetForm;
