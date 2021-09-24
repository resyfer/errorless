import { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";

import Input from "../components/Input";
import NoLinkButton from "../components/NoLinkButton";

import UserContext from "../context/UserContext";

import "./css/OrgAuth.scss";

const OrgAuth = () => {
  const { loggedIn } = useContext(UserContext);
  const history = useHistory();

  const params = useParams();
  const isSignin = params.mode === "signin";

  useEffect(() => {
    document.title = `${isSignin ? "Sign In" : "Sign Up"} | CoLive-21`;
  }, [isSignin]);

  useEffect(() => {
    if (loggedIn) history.push("/");
    // eslint-disable-next-line
  }, [loggedIn]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imgLink, setImgLink] = useState("");
  const [description, setDescription] = useState("");

  return (
    <main className="org-auth">
      <div className="heading">
        Organisation {isSignin ? "Sign In" : "Sign Up"}
      </div>
      <div className="org-auth-form">
        <Input
          placeholder="Name"
          label="Name"
          type="text"
          name="name"
          value={[name, setName]}
        />
        {!isSignin && (
          <Input
            placeholder="Email"
            label="Email"
            type="text"
            name="email"
            value={[email, setEmail]}
          />
        )}
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
        <NoLinkButton name={isSignin ? "Sign In" : "Sign Up"} />
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
