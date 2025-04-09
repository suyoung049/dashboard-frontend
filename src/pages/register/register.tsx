import { useRef } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const email = useRef<HTMLInputElement>(null);
  const userName = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const passwordAgain = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordAgain.current?.value !== password.current?.value) {
      alert("password not match");
    } else {
      const user = {
        userName: userName.current?.value,
        email: email.current?.value,
        password: password.current?.value,
      };
      try {
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Fakebook</h3>
          <span className="loginDesc">
            Connect with Friends and the world around you on Fakebook.
          </span>
        </div>
        <div className="loginRight">
          <form className="registerBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={userName}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              type="email"
              className="loginInput"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              type="password"
              className="loginInput"
              minLength={6}
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              type="password"
              className="loginInput"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button className="loginRegisterButton">Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
};
