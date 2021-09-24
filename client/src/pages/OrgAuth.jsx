import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Input from "../components/Input";

const OrgAuth = () => {
  const params = useParams();
  const isSignin = params.mode === "signin";

  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imgLink, setImgLink] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  return (
    <main className="org-auth">
      <div className="heading">
        Organisation {isSignin ? "Sign In" : "Sign Up"}
      </div>
      <Input
        placeholder="Name"
        label="Name"
        type="text"
        name="user"
        value={[name, setName]}
      />
      <p
        onClick={() =>
          history.push(`/org-auth/${isSignin ? "signup" : "signin"}`)
        }
      >
        {isSignin ? "Register an organization" : "Sign In as an organization"}
      </p>
    </main>
  );
};

export default OrgAuth;
