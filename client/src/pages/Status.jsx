import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import UserContext from "../context/UserContext";
import Input from "../components/Input";

const Status = () => {
  const history = useHistory();

  const { loggedIn, user } = useContext(UserContext);

  const [vaccinationStatus, setVaccinationStatus] = useState(null);

  useEffect(() => {
    if (!loggedIn) history.push("/");
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      user.vaccinationStatus && setVaccinationStatus(user.vaccinationStatus);
    }
  }, [loggedIn]);

  return (
    <main className="status">
      <div className="heading">Status Update</div>
    </main>
  );
};

export default Status;
