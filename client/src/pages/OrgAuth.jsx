import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";

import Input from "../components/Input";
import NoLinkButton from "../components/NoLinkButton";

import UserContext from "../context/UserContext";

import "./css/OrgAuth.scss";

const emailRe =
  // eslint-disable-next-line
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// eslint-disable-next-line
const passwordRe = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,100}$/;

const apiUrl = process.env.REACT_APP_API_URL;

const OrgAuth = () => {
  const context = useContext(UserContext);
  const history = useHistory();

  const params = useParams();
  const isSignin = params.mode === "signin";

  useEffect(() => {
    document.title = `${isSignin ? "Sign In" : "Sign Up"} | CoLive-21`;
  }, [isSignin]);

  // useEffect(() => {
  //   if (context.loggedIn) history.push("/");
  //   // eslint-disable-next-line
  // }, [context.loggedIn]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imgLink, setImgLink] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [name, email, password, confirmPassword, imgLink, description]);

  const handleOrgAuth = () => {
    if (!emailRe.test(email)) {
      setError("Enter valid email");
    }
    if (!passwordRe.test(password)) {
      setError(
        "Password must contain atleast 8 characters, 1 special character and 1 number"
      );
    }
    if (!isSignin) {
      if (password !== confirmPassword) {
        setError("Password and Confirm Password doesn't match");
      } else if (name.length === 0) {
        setError("Enter valid name");
      } else if (imgLink.length === 0) {
        setError("Enter organisation image link");
      } else if (description.length === 0) {
        setError("Enter description of your organisation");
      } else {
        const orgData = {
          name,
          email,
          password,
          confirmPassword,
          img: imgLink,
          description,
        };
        axios
          .post(`${apiUrl}/institute/signup`, orgData)
          .then((res) => {
            if (!res.data.success) {
              setError(res.data.message);
            } else {
              context.setOrg(res.data.org);
              context.setIsOrg(true);
              Cookies.set("org", JSON.stringify(res.data.org), {
                expires: 1,
              });
              Cookies.set("jwt", JSON.stringify(res.data.token), {
                expires: 1,
              });
              Cookies.set("type", "org", {
                expires: 1,
              });
              history.push("/");
            }
          })
          .catch((err) => {
            setError(err);
          });
      }
    } else {
      const orgData = {
        email,
        password,
      };
      axios
        .post(`${apiUrl}/institute/signin`, orgData)
        .then((res) => {
          if (!res.data.success) {
            setError(res.data.message);
          } else {
            context.setOrg(res.data.org);
            context.setIsOrg(true);
            Cookies.set("org", JSON.stringify(res.data.org), {
              expires: 1,
            });
            Cookies.set("jwt", JSON.stringify(res.data.token), {
              expires: 1,
            });
            Cookies.set("type", "org", {
              expires: 1,
            });
            history.push("/");
          }
        })
        .catch((err) => {
          setError(err);
        });
    }
  };

  return (
    <main className="org-auth">
      <div className="heading">
        Organisation {isSignin ? "Sign In" : "Sign Up"}
      </div>
      {error && <p className="authError">{error}</p>}
      <div className="org-auth-form">
        {!isSignin && (
          <Input
            placeholder="Name"
            label="Name"
            type="text"
            name="name"
            value={[name, setName]}
          />
        )}
        <Input
          placeholder="Email"
          label="Email"
          type="text"
          name="email"
          value={[email, setEmail]}
        />
        <Input
          placeholder="Password"
          label="Password"
          type="password"
          name="password"
          value={[password, setPassword]}
        />
        {!isSignin && (
          <>
            <Input
              placeholder="Confirm Password"
              label="Confirm Password"
              type="password"
              name="confirmpassword"
              value={[confirmPassword, setConfirmPassword]}
            />
            <Input
              placeholder="Organisation Image Link"
              label="Organisation Image"
              type="text"
              name="instiimg"
              value={[imgLink, setImgLink]}
            />
            <textarea
              value={description}
              placeholder="Organisation Description"
              onChange={(e) => setDescription(e.target.value)}
              className="org-desc"
            ></textarea>
          </>
        )}
        <NoLinkButton
          name={isSignin ? "Sign In" : "Sign Up"}
          onClick={handleOrgAuth}
        />
        <p
          className="switch-forms"
          onClick={() =>
            history.push(`/org-auth/${isSignin ? "signup" : "signin"}`)
          }
        >
          {isSignin ? "Register an organization" : "Sign In as an organization"}
        </p>
      </div>
    </main>
  );
};

export default OrgAuth;
