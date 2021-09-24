import React, { useContext, useEffect, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";

//* CSS Import
import "./css/Auth.scss";

//* Components import
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
// eslint-disable-next-line
const phoneRe = /^[0-9]{10}$/;

const apiUrl = process.env.REACT_APP_API_URL;

const Auth = (props) => {
  const [isSignin, setIsSignin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [organisation, setOrganisation] = useState({
    name: "",
    orgId: "",
  });
  const [phoneNo, setPhoneNo] = useState("");
  const [organisationDesg, setOrganisationDesg] = useState("");
  const [photo, setPhoto] = useState("");
  const [isError, setIsError] = useState("");

  const [allOrg, setAllOrg] = useState([]);

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
  }, [
    email,
    password,
    confirmPassword,
    name,
    organisationDesg,
    phoneNo,
    organisation,
  ]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/institute`)
      .then((res) => {
        setAllOrg(res.data);
      })
      .catch((err) => {
        setIsError(err.message);
      });
  }, []);

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
        setIsError("Password and Confirm Password doesn't match");
      } else if (name?.length === 0) {
        setIsError("Enter valid name");
      } else if (organisationDesg.length <= 0) {
        setIsError("Please enter a valid designation");
      } else if (phoneNo.length !== 0 && !phoneRe.test(phoneNo)) {
        setIsError("Enter valid phone number");
      } else if (organisation.name.length === 0) {
        setIsError("Select your organisation");
      } else {
        const userData = {
          name,
          email,
          password,
          confirmPassword,
          phoneNo,
          photo,
          organisation: {
            orgId: organisation.orgId,
            name: organisation.name,
            designation: organisationDesg,
          },
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
            window.location.replace("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleOrganisation = (e) => {
    const selectedOrg = allOrg.find((o) => o.orgId === e.target.value);
    setOrganisation({
      name: selectedOrg.organisation,
      orgId: selectedOrg.orgId,
    });
  };

  if (userCtx.loggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <main className="auth">
      <div className="authCard">
        <div className="authForm">
          <h2>{isSignin ? "User Signup" : "User Signin"}</h2>
          {isError?.length > 0 && <p className="authError">{isError}</p>}
          <div className="authFormContainer">
            <div className="authFormLeft">
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
            </div>
            {isSignin && (
              <div className="authFormRight">
                <Input
                  name="phone"
                  type="text"
                  placeholder="Mobile"
                  value={[phoneNo, setPhoneNo]}
                />
                <select
                  name="organisation"
                  type="text"
                  onChange={handleOrganisation}
                  value={organisation.name}
                >
                  <option value="" disabled>
                    Select your organisation Name
                  </option>
                  {allOrg &&
                    allOrg.map((o) => (
                      <option value={o.orgId} key={o.orgId}>
                        {o.organisation}
                      </option>
                    ))}
                </select>
                <Input
                  name="designation"
                  type="text"
                  placeholder="Designation"
                  value={[organisationDesg, setOrganisationDesg]}
                />
                <Input
                  name="photo"
                  type="text"
                  placeholder="Enter your Image link"
                  value={[photo, setPhoto]}
                />
              </div>
            )}
          </div>
          {/* <Link to="/forgot">Forgot Password?</Link> */}
          <NoLinkButton
            name={isSignin ? "Signup" : "Signin"}
            onClick={handleAuth}
          />
          <p className="authMsg" onClick={handleClick}>
            {isSignin
              ? "Already have an account ? Signin"
              : "New to CoLive-21 ? Signup"}
          </p>
          <p
            className="org-auth-link"
            onClick={() =>
              history.push(`/org-auth/${isSignin ? "signup" : "signin"}`)
            }
          >
            {isSignin
              ? "Signin as an organization"
              : "Register an organization"}
          </p>
        </div>
      </div>
    </main>
  );
};

export default Auth;
