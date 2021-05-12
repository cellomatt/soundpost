import React, { useState, useEffect } from "react";
import { Redirect, useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import InputMask from 'react-input-mask';
import { signUp } from '../../services/auth';
import { setUser } from "../../store/session"
import * as teacherActions from '../../store/teacher'
import * as statesActions from '../../store/states'
import Footer from '../Footer'
import './SignUpForm.css'

const SignUpForm = ({authenticated, setAuthenticated, setStudent}) => {
  document.title = "Soundpost — Signup"
  const dispatch = useDispatch();
  const history = useHistory();
  const teachers = useSelector(state => state.teachers.all)
  const states = useSelector(state => state.states.all)
  const [loaded, setLoaded] = useState(false);
  const [role, setRole] = useState(true)
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
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateId, setStateId] = useState("");
  const [errors, setErrors] = useState([]);
  const teachersArray = Object.values(teachers)
  const statesArray = Object.values(states)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    (async () => {
      const data = await dispatch(teacherActions.getAllTeachers());
      const stateData = await dispatch(statesActions.getAllStates());
      if (!data.errors && !stateData.errors) {
        setLoaded(true);
      }
    })();
  }, [dispatch]);

  const changeRole = (e) => {
    e.target.value === "true" ? setRole(true) : setRole(false);
  }

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp({first_name, last_name, email_address, password,
                              instrument, phone, parent_name, photo, teacher_id});
      if (!user.errors) {
        setStudent(role);
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
            <span> *</span>
          </div>
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
            <InputMask mask="(999) 999-9999" maskChar=" " value={phone} onChange={(e) => setPhone(e.target.value) }>
              {() =>
              <input
                type="text"
                className="form__input"
                name="phone"
              ></input>}
            </InputMask>
          </div>
          {role && <div className="form__div">
            <label>Parent or Guardian Name </label>
            <input
              type="text"
              className="form__input"
              name="parent_name"
              onChange={(e) => setParentName(e.target.value)}
              value={parent_name}
            ></input>
          </div>}
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
          {role && <div className="form__div">
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
          </div>}
          {!role &&
          <>
            <div className="form__div">
              <label>Street Address *</label>
              <input
                type="text"
                className="form__input"
                name="street_address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                required={true}
              ></input>
            </div>
            <div className="form__div">
              <label>City *</label>
              <input
                type="text"
                className="form__input"
                name="city"
                onChange={(e) => setCity(e.target.value)}
                value={city}
                required={true}
              ></input>
            </div>
            <div className="form__div">
              <label>State *</label>
              {loaded && <select
                id="state_id"
                value={stateId}
                className="form__input"
                onChange={(e) => setStateId(e.target.value)}
                required={true}
              >
                {statesArray.map(state =>
                <option value={state.id} key={state.id}>
                  {`${state.name}`}
                </option>
                )
                }
              </select>
              }
          </div>
          </>
          }
          <div className="form__div">
            <label>Upload A Profile Photo {!role && <span> *</span>}</label>
            <input
              className="file-input"
              type="file"
              onChange={e => setPhoto(e.target.files[0])}
              required={!role}
              />
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
          <div className="form__div form__switch">
            <p>Already have an account? <Link to="/login">Log in here.</Link></p>
          </div>
        </form>
        <Footer />
      </div>
  );
};

export default SignUpForm;
