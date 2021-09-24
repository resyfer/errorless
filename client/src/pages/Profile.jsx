import React, { useContext, useEffect } from "react";

import UserContext from "../context/UserContext";
import vaccinationStatus from "../context/vaccinationStatus";

import NoLinkButton from "../components/NoLinkButton";

import "./css/Profile.scss";

const Profile = (props) => {
  const { user, loggedIn } = useContext(UserContext);

  useEffect(() => {
    document.title = user?.name + " | CoLive-21";
  }, [user?.name]);

  // useEffect(() => {
  //   if (!loggedIn) {
  //     window.location.replace(`/`);
  //   }
  // }, [loggedIn]);

  console.log(loggedIn);

  return (
    <main className="profile">
      {user && (
        <div className="profileContainer">
          <div className="profileLeft">
            <div className="profileImg">
              <img
                src={
                  user?.photo
                    ? user?.photo
                    : "https://lh3.googleusercontent.com/pw/AM-JKLX0vd9Yl2LyvRpvgpdN5jLFbQgkn2bGdZ9dCzb2kbSAUGg78c3S6MqyccIaEg48Cz5q77DsKIuLbyhdLk0Sg5yzVO6Ohgnth1VKlN4-cKuewTazq9U-wPoGu8QafcdH3YH5E8H11UBHU4x6ouyuexkj=s225-no"
                }
                alt={user?.name}
              />
            </div>
            <div className="profileDetails">
              <p className="profileUserName">{user?.name}</p>
              <p className="profileUserEmail">
                <i className="fas fa-envelope"></i> {user?.email}
              </p>
              <p className="profileUserPhone">
                <i className="fas fa-phone"></i>{" "}
                {user.phoneNo ? user.phoneNo : "Not added"}
              </p>
              <p className="profileUserDesg">
                {user?.organisation.designation}
              </p>
              <p className="profileUseOrg">
                <i className="fas fa-university"></i> {user?.organisation?.name}
              </p>
              <p className="profileUserVaccStatus">
                {user.vaccinationStatus !== null &&
                  vaccinationStatus[user.vaccinationStatus]}
              </p>
              <NoLinkButton
                style={{ padding: "1vh 2vh", margin: "1rem auto" }}
                name="Download your QR Code"
              />
            </div>
          </div>
          <div className="profileRight">
            <p className="profileUserHistoryHeading">History of the user</p>
            <div className="profileUserHistoryOverflow">
              {user.history.length > 0 &&
                user.history.map((h, i) => (
                  <div className="profileUserHistory" key={i}>
                    <span>
                      <i className="fas fa-notes-medical"></i> {h.event}
                    </span>
                    <time>{new Date(h.date).toLocaleString()}</time>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Profile;
