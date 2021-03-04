import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";
import { setUser } from "../../store/session"
import './LoginForm.css'

const LoginForm = ({ authenticated, setAuthenticated }) => {
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
      <form onSubmit={onLogin}>
        <div>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          <button type="submit" onClick={demoLogin}>Demo User</button>
        </div>
      </form>
    </div>

  );
};

export default LoginForm;
