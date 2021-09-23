import React, { useState } from "react";

//* CSS Import
import "./css/Auth.scss";

//* Components import
import Button from "../components/Button";
import Input from "../components/Input";

import { Link } from "react-router-dom";

const Auth = () => {
  const [isSignin, setIsSignin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleClick = () => {
    setIsSignin((prev) => !prev);
  };

  return (
    <main className="auth">
      <div className="authCard">
        <div className="authForm">
          <h2>{isSignin ? "Signup" : "Signin"}</h2>
          <Button
            name={
              <>
                <i class="fab fa-google"></i>{" "}
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
          <Button name={isSignin ? "Signup" : "Signin"} />
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
