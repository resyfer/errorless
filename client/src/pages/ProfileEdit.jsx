//* React
import { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import UserContext from "../context/UserContext";

import NoLinkButton from "../components/NoLinkButton";
import Input from "../components/Input";

import axios from "axios";
import Cookies from "js-cookie";

import "./css/ProfileEdit.scss";

const emailRe =
  // eslint-disable-next-line
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// eslint-disable-next-line
const phoneRe = /^[0-9]{10}$/;

const apiUrl = process.env.REACT_APP_API_URL;

const ProfileEdit = (props) => {
  const { user, loggedIn } = useContext(UserContext);

  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    if (!loggedIn) history.push("/");
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (loggedIn) {
      user.name && setName(user.name);
      user.email && setEmail(user.email);
      user.photo && setName(user.name);
      user.phoneNo && setName(user.phoneNo);
    }
    // eslint-disable-next-line
  }, [loggedIn]);

  //* Set Title
  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  useEffect(() => {
    setError("");
  }, [email, phoneNo, photoUrl, name]);

  const handleSubmit = () => {
    if (phoneNo.length !== 0 && !phoneRe.test(phoneNo)) {
      setError("Enter valid phone number");
    } else if (!emailRe.test(email)) {
      setError("Enter valid email");
    } else if (name.length <= 0) {
      setError("Please enter your name");
    } else {
      const userData = {
        ...user,
        phoneNo,
        email,
        photo: photoUrl,
        name,
      };
      axios
        .put(`${apiUrl}/user/${user._id}`, userData)
        .then((res) => {
          if (!res.data.success) {
            setError(res.data.message);
          } else {
            Cookies.set("user", JSON.stringify(res.data.user));
            window.location.replace(`/user/${user._id}`);
          }
        })
        .catch((err) => {
          setError(err);
        });
    }
  };

  return (
    <main className="prof-edit">
      <div className="heading">Edit User Profile</div>
      {error && <p className="editProfileError">{error}</p>}
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
          placeholder="Photo URL"
          label="Profile Pic"
          type="text"
          name="pfp"
          value={[photoUrl, setPhotoUrl]}
        />
        <Input
          placeholder="Phone"
          label="Phone Number"
          type="tel"
          name="number"
          value={[phoneNo, setPhoneNo]}
        />
        <NoLinkButton name="Save" onClick={handleSubmit} />
      </div>
    </main>
  );
};

export default ProfileEdit;
