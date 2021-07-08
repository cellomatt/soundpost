import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as studentActions from '../../../store/student'
import StudentContainer from '../StudentContainer'
import Footer from '../../Footer'
import './StudentsView.css'

export default function StudentsView(){
  document.title = "Soundpost — Your Students"
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const students = useSelector(state => state.students.all);
  const [firstName, setFirstName] = useState(true);

  useEffect(() => {window.scrollTo(0, 0);}, [])
  useEffect(() => dispatch(studentActions.getStudioStudents(user.id)), [dispatch, user.id])

  const changeOrder = (e) => {
    e.target.value === "true" ? setFirstName(true) : setFirstName(false);
  }

  return (
    <div className="main">
      <div className="dashboard_main">
        <h1 className="title__main">Your Students</h1>
        {students != null && <div className="form__div student-sort">
          {/* <select>

          </select> */}
          <span>Order By:  </span>
          <div>
            <label htmlFor="firstName" id="name__label"> First Name </label>
            <input
              type="radio"
              id="firstName"
              name="firstName"
              onChange={(e) => changeOrder(e)}
              value="true"
              checked={firstName === true}
            ></input>
          </div>
          <div>
            <label htmlFor="lastName" id="name__label"> Last Name </label>
            <input
              type="radio"
              id="lastName"
              name="lastName"
              onChange={(e) => changeOrder(e)}
              value="false"
              checked={firstName === false}
            ></input>
          </div>
        </div>}
        <div className="all-students">
          {students === null &&
            <p>You don't have any registered students. Send them to <b>soundpost.herokuapp.com/signup</b>!</p>
          }
          {students != null &&
            Object.values(students).sort((a,b) => {
              let nameA = firstName ? a.first_name.toUpperCase() : a.last_name.toUpperCase();
              let nameB = firstName ? b.first_name.toUpperCase() : b.last_name.toUpperCase();
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
              return 0;
            }).map(student =>
              <Link to={`/students/${student.id}`} className="student-link" key={student.id}>
                <StudentContainer user={student}></StudentContainer>
              </Link>
            )
          }
        </div>
      </div>
      <Footer />
    </div>
  )
}
