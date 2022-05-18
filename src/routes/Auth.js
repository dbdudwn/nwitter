import AuthForm from "components/AuthForm";
import { authService, firebaseInstance } from "fbInstance";
import React from "react";

const Auth = () => {
  const onSocialSignIn = async (e) => {
    const type = e.target.name;
    if (type === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (type === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const temp = await authService.signInWithPopup(provider);
    console.log(provider, " || ", temp);
  };
  return (
    <div>
      <AuthForm />
      <div>
        <button
          onClick={(e) => {
            onSocialSignIn(e);
          }}
          name="google"
        >
          Continue with Github
        </button>
        <button
          onClick={(e) => {
            onSocialSignIn(e);
          }}
          name="github"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Auth;
