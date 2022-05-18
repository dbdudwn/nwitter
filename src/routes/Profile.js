import { authService, dbService } from "fbInstance";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ userObj, refreshUserInfo }) => {
  const navigate = useNavigate();
  const user = userObj;
  const [userNm, setUserNm] = useState(user.displayName);
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
    refreshUserInfo();
  };

  const getMyNweets = async () => {
    const nweets = await dbService
      .collection("nweets")
      .where("creatorId", "==", user.uid)
      .orderBy("createAt", "desc")
      .get();
  };

  useEffect(() => {
    getMyNweets();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (user.displayName !== userNm) {
      await user.updateProfile({ displayName: userNm });
    }
    refreshUserInfo();
  };

  const onChangeUserNm = (e) => setUserNm(e);

  return (
    <>
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <input
          placeholder="Display Name"
          value={userNm}
          onChange={(e) => {
            onChangeUserNm(e.target.value);
          }}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
