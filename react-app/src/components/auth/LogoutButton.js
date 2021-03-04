import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../services/auth";
import { userLogout } from "../../store/session"


const LogoutButton = ({setAuthenticated}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
    history.push("/");
    dispatch(userLogout());
  };

  return <button className="logout" onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
