import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";
import { setUser } from "../../store/session"
import Footer from '../Footer'
import './LoginForm.css'

const LoginForm = ({ authenticated, setAuthenticated }) => {
  document.title = "Soundpost — Login"
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      dispatch(setUser(user));
      setAuthenticated(true);
    } else {
      setErrors(user.errors);
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    const demoUser = await login('demo@email.com', 'password');
    if (!demoUser.errors) {
      dispatch(setUser(demoUser))
      setAuthenticated(true);
    } else {
      setErrors(demoUser.errors);
    }
  }

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="main">
      <form className="form " onSubmit={onLogin}>
        <h1 className="form__title">Log In</h1>
        {errors.length > 0 &&
        <div className="form__div form__errors">
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        }
        <div className="form__div">
          <label htmlFor="email">Email Address: </label>
          <input
            name="email"
            className="form__input"
            type="text"
            placeholder="Email"
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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form__div form__buttons">
          <button className="btn__secondary" type="submit">Log In</button>
          <button className="btn__secondary" type="submit" onClick={demoLogin}>Demo User</button>
        </div>
      </form>
      <Footer />
    </div>

  );
};

export default LoginForm;
