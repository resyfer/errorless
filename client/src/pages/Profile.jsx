import React, { useContext, useEffect, useState, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";

import UserContext from "../context/UserContext";
import vaccinationStatus from "../context/vaccinationStatus";

import NoLinkButton from "../components/NoLinkButton";

import axios from "axios";
import QRCode from "qrcode.react";
import Cookies from "js-cookie";

import "./css/Profile.scss";

const Profile = () => {
  const { user, loggedIn } = useContext(UserContext);
  const [profileUser, setProfileUser] = useState();
  const [showQR, setShowQR] = useState(false);
  const userHistories = [];

  const history = useHistory();
  const location = useLocation();

  const addHistoryInput = useRef();

  useEffect(() => {
    document.title = (profileUser?.name || "User") + " | CoLive-21";
  }, [profileUser?.name]);

  useEffect(() => {
    const userId = window.location.pathname.split("/user/")[1];
    if (userId) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/user/${userId}`)
        .then((res) => {
          if (!res.data.success) {
            history.push(`/institute/${user.organisation.orgId}`);
          } else {
            setProfileUser(res.data.user);
          }
        })
        .catch((err) => console.log(err));
    } else {
      history.push(`/user/${user._id}`);
    }
  }, [location]);

  useEffect(() => {
    if (profileUser && profileUser?._id === user._id) {
      // fetch user history
      axios
        .get(`${process.env.REACT_APP_API_URL}/user/${user._id}/history`)
        .then((res) => {
          if (res.data.success) {
            userHistories.push(...res.data.history);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [profileUser]);

  const handleAddHistory = () => {
    userHistories.push({
      date: new Date(),
      event: addHistoryInput.current.value,
    });
    axios
      .put(`${process.env.REACT_APP_API_URL}/user/${user._id}/history`, {
        userId: user._id,
        history: userHistories,
      })
      .then((res) => {
        if (res.data.success) {
          Cookies.set("user", JSON.stringify(res.data.user));
          window.location.replace(`/user/${user._id}`);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <main className="profile">
      {profileUser && (
        <div className="profileContainer">
          <div className="profileLeft">
            <div className="profileImg">
              <img
                src={
                  profileUser?.photo
                    ? profileUser?.photo
                    : "https://lh3.googleusercontent.com/pw/AM-JKLUYXZMkLSuQHENLROTjKQLYnzNZt7Q4rkmdtAyBtGJfNW32w1k6jaTC2Oju7xHORmlTRTOiyyuhewCM10hpS9Rt4BQeIk3WJ7MHzlFpozHx3KXGdAHHV9vEq2XmeOERSSiiqbziNAVGRHI7lVPW78G4=s225-no"
                }
                alt={profileUser?.name}
              />
            </div>
            <div className="profileDetails">
              <p className="profileUserName">{profileUser?.name}</p>
              <p className="profileUserEmail">
                <i className="fas fa-envelope"></i> {profileUser?.email}
              </p>
              <p className="profileUserPhone">
                <i className="fas fa-phone"></i>{" "}
                {profileUser.phoneNo ? profileUser.phoneNo : "Not added"}
              </p>
              <p className="profileUserDesg">
                {profileUser?.organisation?.designation}
              </p>
              <p className="profileUseOrg">
                <i className="fas fa-university"></i>{" "}
                {profileUser?.organisation?.name}
              </p>
              <p
                className="profileUserVaccStatus"
                style={{
                  color:
                    profileUser?.vaccinationStatus === 0
                      ? "red"
                      : profileUser?.vaccinationStatus === 1
                      ? "orange"
                      : "green",
                }}
              >
                {profileUser.vaccinationStatus !== null &&
                  vaccinationStatus[profileUser.vaccinationStatus]}
              </p>
              <p
                className="profileUserStatus"
                style={{
                  color: profileUser?.status === "Healthy" ? "green" : "red",
                }}
              >
                {profileUser.status !== null && profileUser.status}
              </p>
              {profileUser._id === user._id && (
                <>
                  <NoLinkButton
                    style={{ padding: "1vh 2vh", margin: "1rem auto" }}
                    name="Show your QR Code"
                    onClick={() => {
                      setShowQR((prev) => !prev);
                    }}
                  />
                  {showQR && (
                    <>
                      <div
                        className="profileBackdrop"
                        onClick={() => {
                          setShowQR((prev) => !prev);
                        }}
                      ></div>
                      <div className="profileModel">
                        <div className="profileModelContent">
                          <QRCode size={200} value={window.location.href} />
                        </div>
                        <div className="profileModelAction">
                          <NoLinkButton
                            name="Hide your QR code"
                            onClick={() => {
                              setShowQR((prev) => !prev);
                            }}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="profileRight">
            <p className="profileUserHistoryHeading">History of the user</p>
            <div className="profileUserHistoryOverflow">
              {profileUser.history.length > 0 &&
                profileUser.history.map((h, i) => (
                  <div className="profileUserHistory" key={i}>
                    <span>
                      <i className="fas fa-notes-medical"></i> {h.event}
                    </span>
                    <time>{new Date(h.date).toLocaleString()}</time>
                  </div>
                ))}
            </div>

            {profileUser._id === user._id && (
              <div className="addHistory">
                <NoLinkButton name="+" onClick={handleAddHistory} />
                <input
                  type="text"
                  placeholder="Add History Event"
                  ref={addHistoryInput}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default Profile;
