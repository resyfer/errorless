import React, { useRef } from "react";

import "./css/User.scss";

const User = (props) => {
  const userRef = useRef();

  const handleBan = (e) => {
    props.banUser(props.userId);
  };

  const handleDelete = (e) => {
    props.deleteUser(props.userId);
  };
  return (
    <div className="userCompContainer" ref={userRef}>
      <div className="userCompDetails">
        <img src={props.img} alt={props.name} />
        <span>
          {props.name}, <small>{props.desg}</small>
        </span>
      </div>
      <div className="userCompActions">
        <i className="fas fa-ban" onClick={handleBan}></i>
        <i className="fas fa-trash" onClick={handleDelete}></i>
      </div>
    </div>
  );
};

export default User;
