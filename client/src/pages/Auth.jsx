import React, { useContext, useEffect, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";

//* CSS Import
import "./css/Auth.scss";

//* Components import
import Button from "../components/Button";
import Input from "../components/Input";
import NoLinkButton from "../components/NoLinkButton";

import UserContext from "../context/UserContext";

//* Library import
import axios from "axios";
import Cookies from "js-cookie";

const emailRe =
  // eslint-disable-next-line
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// eslint-disable-next-line
const passwordRe = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,1000}$/;

const apiUrl = process.env.REACT_APP_API_URL;

const Auth = (props) => {
  const [isSignin, setIsSignin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isError, setIsError] = useState("");

  const userCtx = useContext(UserContext);

  const history = useHistory();

  const handleClick = () => {
    setIsSignin((prev) => !prev);
    setIsError("");
  };

  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  useEffect(() => {
    setIsError("");
  }, [email, password, confirmPassword, name]);

  const handleAuth = () => {
    if (!emailRe.test(email)) {
      setIsError("Enter valid email");
    }
    if (!passwordRe.test(password)) {
      setIsError(
        "Password must contain atleast 8 characters, 1 special character and 1 number"
      );
    }
    if (isSignin) {
      if (password !== confirmPassword) {
        setIsError("Password and Confirm Password doens't match");
      } else if (name?.length === 0) {
        setIsError("Enter valid name");
      } else {
        const userData = {
          name,
          email,
          password,
          confirmPassword,
        };
        axios
          .post(`${apiUrl}/user/signup`, userData)
          .then((res) => {
            if (!res.data.success) {
              setIsError(res.data.message);
            } else {
              userCtx.setUser(res.data.user);
              userCtx.setLoggedIn(true);
              Cookies.set("user", JSON.stringify(res.data.user), {
                expires: 1,
              });
              Cookies.set("jwt", JSON.stringify(res.data.token), {
                expires: 1,
              });
              history.push("/");
            }
          })
          .catch((err) => {
            setIsError(err);
          });
      }
    } else {
      const userData = {
        email,
        password,
      };
      axios
        .post(`${apiUrl}/user/signin`, userData)
        .then((res) => {
          if (!res.data.success) {
            setIsError(res.data.message);
          } else {
            userCtx.setUser(res.data.user);
            userCtx.setLoggedIn(true);
            Cookies.set("user", JSON.stringify(res.data.user), {
              expires: 1,
            });
            Cookies.set("jwt", JSON.stringify(res.data.token), {
              expires: 1,
            });
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  if (userCtx.loggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <main className="auth">
      <div className="authCard">
        <div className="authForm">
          <h2>{isSignin ? "Signup" : "Signin"}</h2>
          {isError?.length > 0 && <p className="authError">{isError}</p>}
          <Button
            name={
              <>
                <i className="fab fa-google"></i>{" "}
                {isSignin ? "Signup with google" : "Signin with google"}
              </>
            }
            link="/auth"
          />
          <span className="authText">
            or {isSignin ? "signup" : "signin"} using your email
          </span>
          {isSignin && (
            <Input
              name="name"
              type="text"
              placeholder="Name"
              value={[name, setName]}
            />
          )}
          <Input
            name="email"
            type="text"
            placeholder="Email"
            value={[email, setEmail]}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={[password, setPassword]}
          />
          {isSignin && (
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={[confirmPassword, setConfirmPassword]}
            />
          )}
          {/* <Link to="/forgot">Forgot Password?</Link> */}
          <NoLinkButton
            name={isSignin ? "Signup" : "Signin"}
            onClick={handleAuth}
          />
          <p className="authMsg" onClick={handleClick}>
            {isSignin
              ? "Already have an account? Signin"
              : "New to errorless? Signup"}
          </p>
        </div>
      </div>
    </main>
  );
};

export default Auth;
