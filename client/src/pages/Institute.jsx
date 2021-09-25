//* React
import { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

import UserContext from "../context/UserContext";

import vaccinationStatus from "../context/vaccinationStatus";

import { PieChart } from "react-minimal-pie-chart";

//* CSS
import "./css/Institute.scss";

const Institute = () => {
  const [orgData, setOrgData] = useState(null);
  const [usersData, setUsersData] = useState(null);

  const history = useHistory();
  const params = useParams();

  const { loggedIn, isOrg, url } = useContext(UserContext);

  const apiUrl = url;

  //* Set Title
  useEffect(() => {
    if (orgData) document.title = orgData.name + " | CoLive-21";
    else document.title = "Institute | CoLive-21";
  }, [orgData]);

  useEffect(() => {
    (loggedIn || isOrg) &&
      axios
        .get(`${apiUrl}/institute/${params.id}`)
        .then((res) => res.data)
        .then((data) => setOrgData(data.org))
        .then(
          axios(`${apiUrl}/users`)
            .then((res) => res.data)
            .then((data) => setUsersData(data.users))
        );
  }, [params.id, loggedIn, isOrg]);

  useEffect(() => {
    if (!loggedIn && !isOrg) history.push("/");
  });

  return (
    <main className="insti">
      <h3 className="insti-name">{orgData && orgData.name}</h3>
      <div className="insti-info">
        <div className="info-left">
          <img src={orgData && orgData.img} alt={orgData && orgData.name} />
        </div>
        <div className="info-right">
          <div className="description">{orgData && orgData.description}</div>
          <div className="members-count">
            Members: {orgData && orgData.crew.length}
          </div>
        </div>
      </div>

      <div className="heading">Stats</div>
      {orgData && (
        <div className="chart">
          <div className="pie-chart">
            <PieChart
              data={[
                {
                  title: vaccinationStatus[0],
                  value: orgData.status[0],
                  color: "var(--theme-2-100)",
                },
                {
                  title: vaccinationStatus[1],
                  value: orgData.status[1],
                  color: "var(--theme-3-100)",
                },
                {
                  title: vaccinationStatus[2],
                  value: orgData.status[2],
                  color: "var(--theme-4-100)",
                },
              ]}
              animate={true}
              startAngle={-30}
            />
          </div>
          <div className="legend">
            <div className="legend-itm">
              <div
                className="legend-color"
                style={{ backgroundColor: "var(--theme-4-100)" }}
              ></div>
              <div className="legend-label">
                {vaccinationStatus[2]} - {orgData.status[2]}
              </div>
            </div>
            <div className="legend-itm">
              <div
                className="legend-color"
                style={{ backgroundColor: "var(--theme-3-100)" }}
              ></div>
              <div className="legend-label">
                {vaccinationStatus[1]} - {orgData.status[1]}
              </div>
            </div>
            <div className="legend-itm">
              <div
                className="legend-color"
                style={{ backgroundColor: "var(--theme-2-100)" }}
              ></div>
              <div className="legend-label">
                {vaccinationStatus[0]} - {orgData.status[0]}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="heading">Members</div>
      <div className="members">
        {orgData &&
          usersData &&
          usersData.map((user) => {
            if (user.organisation.orgId === orgData._id)
              return (
                <div
                  key={user._id}
                  className="member-card"
                  onClick={() => history.push(`/user/${user._id}`)}
                >
                  <div className="member-pic">
                    <img src={user.photo} alt={user.name} />
                  </div>
                  <div className="member-info">
                    <div className="user-name">{user.name}</div>
                    <div className="user-designation">
                      {user.organisation.designation}
                    </div>
                    <div
                      className="user-vac-status"
                      style={{
                        color:
                          user.vaccinationStatus === 2
                            ? "Green"
                            : user.vaccinationStatus === 1
                            ? "Blue"
                            : "Red",
                      }}
                    >
                      {vaccinationStatus[user.vaccinationStatus]}
                    </div>
                    <div
                      className="user-health-status"
                      style={{
                        color: user.status === "Healthy" ? "Green" : "Red",
                      }}
                    >
                      {user.status}
                    </div>
                  </div>
                </div>
              );
            else return false;
          })}
      </div>
    </main>
  );
};

export default Institute;
