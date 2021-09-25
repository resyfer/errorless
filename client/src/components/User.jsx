import React, {useEffect, useRef} from 'react';

import "./css/User.scss"

const User = props => {

  const userRef = useRef();

  useEffect(()=>{
    if(props.ban[0]){
      userRef.current.style.cursor = "not-allowed";
      userRef.current.style.opacity = "0.4"; 
    }
  },[props.ban[0]])

  const handleBan = (e)=>{
    if(!props.ban[0]){
      props.ban[1](true);
      userRef.current.style.cursor = "not-allowed";
      userRef.current.style.opacity = "0.4"; 
    }
  }

  const handleDelete = (e)=>{
    props.setIsDelete(true);
  }
  return (
    <div className="userCompContainer" ref={userRef}>
      <div className="userCompDetails">
        <img src={props.img} alt={props.name} />
        <span>{props.name}, <small>{props.desg}</small></span>
      </div>
      <div className="userCompActions">
        <i className="fas fa-ban" onClick={handleBan}></i>
        <i className="fas fa-trash" onClick={handleDelete}></i>
      </div>
    </div>  
  )
}

export default User;