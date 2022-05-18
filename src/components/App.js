import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbInstance";

const App = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUserInfo = () => {
    setUserObj(authService.currentUser);
  };

  return (
    <>
      {init ? (
        <AppRouter
          refreshUserInfo={refreshUserInfo}
          isLoggedIn={isLoggedIn}
          userObj={userObj}
        />
      ) : (
        "Initializing ..."
      )}
    </>
  );
};

export default App;
