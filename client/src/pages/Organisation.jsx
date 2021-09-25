import React, { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import User from "../components/User";

import UserContext from "../context/UserContext";

import "./css/Organisation.scss";

import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const Organisation = () => {
  const { isOrg, org } = useContext(UserContext);
  const params = useParams();
  const history = useHistory();
  const [orgData, setOrgData] = useState(null);
  const [usersData, setUsersData] = useState(null);

  useEffect(() => {
    if (isOrg) document.title = org.name + " | CoLive-21";
    else document.title = "CoLive-21";
  }, [isOrg, org.name]);

  useEffect(() => {
    if (!isOrg || org._id !== params.id) history.push("/");
  }, [org, isOrg, history, params.id]);

  useEffect(() => {
    isOrg &&
      axios
        .get(`${apiUrl}/institute/${params.id}`)
        .then((res) => res.data)
        .then((data) => setOrgData(data.org))
        .then(
          axios(`${apiUrl}/users`)
            .then((res) => res.data)
            .then((data) => setUsersData(data.users))
        );
  }, [params.id, isOrg]);

  // Pass these two functions to User props as banUser and deleteUser
  const userBan = (userId) => {
    axios
      .post(`${apiUrl}/user/${userId}/ban`)
      .then((res) => {
        if (res.data.success) {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const userDelete = (userId) => {
    axios
      .delete(`${apiUrl}/user/${userId}/delete`)
      .then((res) => {
        if (res.data.success) {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main className="organisation">
      <div className="heading">{org.name}</div>
      <div className="org-details">
        <div className="details-left">
          <div className="org-img">
            <img src={org.img} alt={org.name} />
          </div>
          <div className="description">{org.description}</div>
        </div>
        <div className="details-right">
          <div className="heading">Users</div>
          <div className="users">
            {usersData &&
              usersData.map((user) => {
                if (org._id === user.organisation.orgId) {
                  return (
                    <>
                      <User
                        key={user._id}
                        userId={user._id}
                        name={user.name}
                        img={user.photo}
                        desg={user.organisation.designation}
                        banUser={userBan}
                        deleteUser={userDelete}
                      />
                      <br />
                    </>
                  );
                } else return false;
              })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Organisation;
