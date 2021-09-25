import { useState, useContext, useEffect } from "react";
import UserContext from "../context/UserContext";

import Input from "../components/Input";

import "./css/OrgEdit.scss";
import NoLinkButton from "../components/NoLinkButton";

const OrgEdit = () => {
  const { org, isOrg } = useContext(UserContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  useEffect(() => {
    org.name && setName(org.name);
    org.email && setEmail(org.email);
    org.img && setImg(org.img);
  }, [org, isOrg]);

  return (
    <main className="org-edit">
      <div className="heading">Organisation Profile Edit</div>
      <div className="card">
        <Input
          placeholder="Name"
          label="Name"
          type="text"
          name="name"
          value={[name, setName]}
        />
        <Input
          placeholder="Email"
          label="Email"
          type="text"
          name="email"
          value={[email, setEmail]}
        />
        <Input
          placeholder="Img"
          label="Img"
          type="text"
          name="img"
          value={[img, setImg]}
        />
        <Input
          placeholder="Password"
          label="Password"
          type="password"
          name="password"
          value={[password, setPassword]}
        />
        {password != "" && (
          <>
            <Input
              placeholder="Confirm Password"
              label="Confirm Password"
              type="password"
              name="confirmpassword"
              value={[confirmPassword, setConfirmPassword]}
            />
            <Input
              placeholder="Old Password"
              label="Old Password"
              type="password"
              name="oldpassword"
              value={[oldPassword, setOldPassword]}
            />
          </>
        )}
        <textarea
          value={description}
          placeholder="Organisation Description"
          onChange={(e) => setDescription(e.target.value)}
          className="org-desc"
        ></textarea>
        <NoLinkButton name="Save" />
      </div>
    </main>
  );
};

export default OrgEdit;
