import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { login } from "../../services/auth";
import { setUser } from "../../store/session"
import Footer from '../Footer'
import './LoginForm.css'

const LoginForm = ({ authenticated, setAuthenticated, setStudent }) => {
  document.title = "Soundpost — Login"
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(true)
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password, role);
    if (!user.errors) {
      setStudent(role);
      dispatch(setUser(user));
      setAuthenticated(true);
    } else {
      setErrors(user.errors);
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    const demoUser = await login('demo@email.com', 'password', role);
    if (!demoUser.errors) {
      setStudent(role);
      dispatch(setUser(demoUser))
      setAuthenticated(true);
    } else {
      setErrors(demoUser.errors);
    }
  }

  const changeRole = (e) => {
    e.target.value === "true" ? setRole(true) : setRole(false);
  }

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="main">
      <form className="form login-form" onSubmit={onLogin}>
        <h1 className="form__title">Log In</h1>
        {errors.length > 0 &&
        <div className="form__div form__errors">
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        }
        <div className="form__div">
          <label htmlFor="student">Student </label>
          <input
            id="student"
            type="radio"
            name="role"
            onChange={(e) => changeRole(e)}
            value="true"
            checked={role === true}
          ></input>
          <label htmlFor="teacher"> Teacher </label>
          <input
            id="teacher"
            type="radio"
            name="role"
            onChange={(e) => changeRole(e)}
            value="false"
            checked={role === false}
          ></input>
        </div>
        <div className="form__div">
          <label htmlFor="email">Email Address: </label>
          <input
            name="email"
            className="form__input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form__div">
          <label htmlFor="password">Password: </label>
          <input
            name="password"
            className="form__input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form__div form__buttons">
          <button className="btn__secondary" type="submit">Log In</button>
          <button className="btn__secondary" type="submit" onClick={demoLogin}>Demo User</button>
        </div>
        <div className="form__div form__switch">
          <p>Don't have an account? <Link to="/signup">Sign up here.</Link></p>
        </div>
      </form>
      <Footer />
    </div>

  );
};

export default LoginForm;
