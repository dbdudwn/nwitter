import { React, useState } from "react";
import { authService } from "fbInstance";

const AuthForm = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [signUp, setSignUp] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (signUp) {
        data = await authService.createUserWithEmailAndPassword(
          input.email,
          input.password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(
          input.email,
          input.password
        );
      }
    } catch (err) {
      setErrMsg(err.message);
    }
  };

  const toggleAccount = () => setSignUp((prev) => !prev);

  return (
    <>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          onChange={(e) => setInput({ ...input, email: e.target.value })}
          type="email"
          placeholder="Email"
          required
          value={input.email || ""}
        />
        <input
          onChange={(e) => setInput({ ...input, password: e.target.value })}
          type="password"
          placeholder="Password"
          required
          value={input.password || ""}
        />
        <input type="submit" value={signUp ? "Sign Up" : "Sign In"} />
        <div>{errMsg ? errMsg : null}</div>
      </form>
      <span onClick={toggleAccount}>{signUp ? "sign - Up" : "sign - In"}</span>
    </>
  );
};
export default AuthForm;
