import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";

import UserContext from "../context/UserContext";

import NoLinkButton from "../components/NoLinkButton";

import "./css/Profile.scss";

const Profile = (props) => {
  const { user, loggedIn } = useContext(UserContext);

  useEffect(() => {
    document.title = user?.name;
  }, [user?.name]);

  if (!loggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <main className="profile">
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
            <p className="profileUserName">Pratik Majumdar</p>
            <p className="profileUserEmail">
              <i class="fas fa-envelope"></i> info.pratikmajumdar@gmail.com
            </p>
            <p className="profileUserPhone">
              <i class="fas fa-phone"></i> 9101453497
            </p>
            <p className="profileUserDesg">Student</p>
            <p className="profileUseOrg">
              <i class="fas fa-university"></i> NIT, Silchar
            </p>
            <p className="profileUserVaccStatus">Fully Vaccinated</p>
            <NoLinkButton
              style={{ padding: "1vh 2vh", margin: "1rem auto" }}
              name="Download your QR Code"
            />
          </div>
        </div>
        <div className="profileRight">
          <p className="profileUserHistoryHeading">History of the user</p>
          <div className="profileUserHistoryOverflow">
            <div className="profileUserHistory">
              <span>
                <i class="fas fa-notes-medical"></i> I suffered from PTSD
              </span>
              <time>24/10/2021</time>
            </div>
            <div className="profileUserHistory">
              <span>
                <i class="fas fa-notes-medical"></i> I suffered from PTSD
              </span>
              <time>24/10/2021</time>
            </div>
            <div className="profileUserHistory">
              <span>
                <i class="fas fa-notes-medical"></i> I suffered from PTSD
              </span>
              <time>24/10/2021</time>
            </div>
            <div className="profileUserHistory">
              <span>
                <i class="fas fa-notes-medical"></i> I suffered from PTSD
              </span>
              <time>24/10/2021</time>
            </div>
            <div className="profileUserHistory">
              <span>
                <i class="fas fa-notes-medical"></i> I suffered from PTSD
              </span>
              <time>24/10/2021</time>
            </div>
            <div className="profileUserHistory">
              <span>
                <i class="fas fa-notes-medical"></i> I suffered from PTSD
              </span>
              <time>24/10/2021</time>
            </div>
            <div className="profileUserHistory">
              <span>
                <i class="fas fa-notes-medical"></i> I suffered from PTSD
              </span>
              <time>24/10/2021</time>
            </div>
            <div className="profileUserHistory">
              <span>
                <i class="fas fa-notes-medical"></i> I suffered from PTSD
              </span>
              <time>24/10/2021</time>
            </div>
            <div className="profileUserHistory">
              <span>
                <i class="fas fa-notes-medical"></i> I suffered from PTSD
              </span>
              <time>24/10/2021</time>
            </div>
            <div className="profileUserHistory">
              <span>
                <i class="fas fa-notes-medical"></i> I suffered from PTSD
              </span>
              <time>24/10/2021</time>
            </div>
            <div className="profileUserHistory">
              <span>
                <i class="fas fa-notes-medical"></i> I suffered from PTSD
              </span>
              <time>24/10/2021</time>
            </div>
            <div className="profileUserHistory">
              <span>
                <i class="fas fa-notes-medical"></i> I suffered from PTSD
              </span>
              <time>24/10/2021</time>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
