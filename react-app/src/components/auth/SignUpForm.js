import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../services/auth';
import './SignUpForm.css'

const SignUpForm = ({authenticated, setAuthenticated}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(username, first_name, last_name, email, password);
      if (!user.errors) {
        setAuthenticated(true);
      } else {
        setErrors(user.errors);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="main">
      <form className="form vertical-center" onSubmit={onSignUp}>
        <h1 className="form__title">Sign Up</h1>
        {errors.length > 0 &&
        <div className="form__div form__errors">
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        }
        <div className="form__div">
          <label>User Name</label>
          <input
            type="text"
            className="form__input"
            name="username"
            onChange={updateUsername}
            value={username}
            required={true}
          ></input>
        </div>
        <div className="form__div">
          <label>Email</label>
          <input
            type="text"
            className="form__input"
            name="email"
            onChange={updateEmail}
            value={email}
            required={true}
          ></input>
        </div>
        <div className="form__div">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form__input"
            onChange={updatePassword}
            value={password}
            required={true}
          ></input>
        </div>
        <div className="form__div">
          <label>Confirm Password</label>
          <input
            type="password"
            name="repeat_password"
            className="form__input"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <div className="form__div form__buttons">
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>

  );
};

export default SignUpForm;
