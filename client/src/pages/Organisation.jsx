import { useContext, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import UserContext from "../context/UserContext";

import "./css/Organisation.scss";

import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const Organisation = () => {
  const { isOrg, org } = useContext(UserContext);
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    if (isOrg) document.title = org.name + " | CoLive-21";
    else document.title = "CoLive-21";
  }, []);

  useEffect(() => {
    if (!isOrg || org._id !== params.id) history.push("/");
  }, [org, isOrg]);

  // Pass these two functions to User props as banUser and deleteUser
  const userBan = (userId)=>{
    axios.post(`${apiUrl}/user/${userId}/ban`)
    .then(res=>{
      if(res.data.success){
        // needs to be reloaded to see the changes
      }
    }).catch(err => {
      console.log(err);
    })
  };

  const userDelete = (userId)=>{
    axios.post(`${apiUrl}/user/${userId}/delete`)
    .then(res=>{
      if(res.data.success){
        // needs to be reloaded to see the changes
      }
    }).catch(err => {
      console.log(err);
    })
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
          <div className="users"></div>
        </div>
      </div>
    </main>
  );
};

export default Organisation;
