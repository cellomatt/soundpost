import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../services/auth';
import './SignUpForm.css'

const SignUpForm = ({authenticated, setAuthenticated}) => {
  const [email_address, setEmailAddress] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [instrument, setInstrument] = useState("");
  const [phone, setPhone] = useState("");
  const [parent_name, setParentName] = useState("");
  const [photo, setPhoto] = useState("");
  const [teacher_id, setTeacherId] = useState(null);
  const [errors, setErrors] = useState([]);

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(first_name, last_name, email_address, password,
                              instrument, phone, parent_name, photo, teacher_id);
      if (!user.errors) {
        setAuthenticated(true);
      } else {
        setErrors(user.errors);
      }
    }
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="main">
      <form className="form" onSubmit={onSignUp}>
        <h1 className="form__title">Sign Up</h1>
        {errors.length > 0 &&
        <div className="form__div form__errors">
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        }
        <p>* indicates a required field</p>
        <div className="form__div">
          <label>First Name *</label>
          <input
            type="text"
            className="form__input"
            name="first_name"
            onChange={(e) => setFirstName(e.target.value)}
            value={first_name}
            required={true}
          ></input>
        </div>
        <div className="form__div">
          <label>Last Name *</label>
          <input
            type="text"
            className="form__input"
            name="last_name"
            onChange={(e) => setLastName(e.target.value)}
            value={last_name}
            required={true}
          ></input>
        </div>
        <div className="form__div">
          <label>Email Address *</label>
          <input
            type="text"
            className="form__input"
            name="email_address"
            onChange={(e) => setEmailAddress(e.target.value)}
            value={email_address}
            required={true}
          ></input>
        </div>
        <div className="form__div">
          <label>Phone Number *</label>
          <input
            type="text"
            className="form__input"
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            required={true}
          ></input>
        </div>
        <div className="form__div">
          <label>Instrument *</label>
          <input
            type="text"
            className="form__input"
            name="instrument"
            onChange={(e) => setInstrument(e.target.value)}
            value={instrument}
            required={true}
          ></input>
        </div>
        <div className="form__div">
          <label>Parent or Guardian Name </label>
          <input
            type="text"
            className="form__input"
            name="parent_name"
            onChange={(e) => setParentName(e.target.value)}
            value={parent_name}
          ></input>
        </div>
        {/* ADD A TEACHER SELECT HERE */}
        <div className="form__div">
          <label>Upload A Profile Photo </label>
          <input className="file-input" type="file" onChange={e => setPhoto(e.target.files[0])}/>
        </div>
        <div className="form__div">
          <label>Password *</label>
          <input
            type="password"
            name="password"
            className="form__input"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required={true}
          ></input>
        </div>
        <div className="form__div">
          <label>Confirm Password *</label>
          <input
            type="password"
            name="repeat_password"
            className="form__input"
            onChange={(e) => setRepeatPassword(e.target.value)}
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
