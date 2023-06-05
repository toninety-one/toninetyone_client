import { useRef, useState, useEffect, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import {
  useGetUserMutation,
  useLoginMutation,
} from "../../types/auth/auth.api.slice";
import { refresh } from "../../types/auth/auth.slice";
import { ILogin } from "../../types/user/user.interface";

const Login = () => {
  const userRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const errRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [userData, setUserData] = useState("");
  const [passwordData, setPasswordData] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const [getUser] = useGetUserMutation();
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [userData, passwordData]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const data: ILogin = { username: userData, password: passwordData };
      const loginResponce = await login(data).unwrap();

      dispatch(refresh({ token: loginResponce, user: null }));

      const userResponce = await getUser(null).unwrap();
      
      dispatch(refresh({ token: loginResponce, user: userResponce }));

      setUserData("");
      setPasswordData("");
      navigate("/profile");
    } catch (err: any) {
      if (!err?.status) {
        setErrMsg("No Server Response");
      } else if (err.originalStatus === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e: { target: { value: SetStateAction<string> } }) =>
    setUserData(e.target.value);

  const handlePwdInput = (e: { target: { value: SetStateAction<string> } }) =>
    setPasswordData(e.target.value);

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <section className="login">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>

      <h1>Employee Login</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          value={userData}
          onChange={handleUserInput}
          autoComplete="off"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={handlePwdInput}
          value={passwordData}
          required
        />
        <button>Sign In</button>
      </form>
    </section>
  );
};
export default Login;
