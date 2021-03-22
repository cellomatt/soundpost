import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signUp } from '../../services/auth';
import { setUser } from "../../store/session"
import * as teacherActions from '../../store/teacher'
import './SignUpForm.css'

const SignUpForm = ({authenticated, setAuthenticated}) => {
  document.title = "Soundpost — Signup"
  const dispatch = useDispatch();
  const history = useHistory();
  const teachers = useSelector(state => state.teachers.all)
  const [loaded, setLoaded] = useState(false);
  const [email_address, setEmailAddress] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [instrument, setInstrument] = useState("");
  const [phone, setPhone] = useState("");
  const [parent_name, setParentName] = useState("");
  const [photo, setPhoto] = useState("");
  const [teacher_id, setTeacherId] = useState("");
  const [errors, setErrors] = useState([]);
  const teachersArray = Object.values(teachers)

  useEffect(() => {
    (async () => {
      const data = await dispatch(teacherActions.getAllTeachers());
      if (!data.errors) {
        setLoaded(true);
      }
    })();
  }, [dispatch]);


  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp({first_name, last_name, email_address, password,
                              instrument, phone, parent_name, photo, teacher_id});
      if (!user.errors) {
        dispatch(setUser(user));
        setAuthenticated(true);
        history.push("/");
        window.scrollTo(0, 0);
      } else {
        setErrors(user.errors);
        window.scrollTo(0, 0);
      }
    } else {
      window.scrollTo(0, 0);
      return setErrors(['Confirm Password field must be the same as the Password field']);
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
          <p className="required_label">* indicates a required field</p>
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
              type="email"
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
            <label>Parent or Guardian Name </label>
            <input
              type="text"
              className="form__input"
              name="parent_name"
              onChange={(e) => setParentName(e.target.value)}
              value={parent_name}
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
            <label>Teacher *</label>
            {loaded && <select
              id="teacher_id"
              value={teacher_id}
              className="form__input"
              onChange={(e) => setTeacherId(e.target.value)}
              required={true}
            >
                <option defaultValue>Please select a teacher</option>
                {teachersArray.map(teacher =>
                <option value={teacher.id} key={teacher.id}>
                  {`${teacher.first_name} ${teacher.last_name}, ${teacher.instrument}`}
                </option>
                )
                }
            </select>
            }
          </div>
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
            <button className="btn__secondary" type="submit">Sign Up</button>
          </div>
        </form>
      </div>
  );
};

export default SignUpForm;
