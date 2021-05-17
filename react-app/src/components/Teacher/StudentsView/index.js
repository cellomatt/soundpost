import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import * as studentActions from '../../../store/student'
import './StudentsView.css'

export default function StudentsView(){
  document.title = "Soundpost — Your Students"
  const dispatch = useDispatch();
  // const history = useHistory();
  // const [change, setChange] = useState(false);
  const user = useSelector(state => state.session.user);
  const students = useSelector(state => state.students.all)

  useEffect(() => {window.scrollTo(0, 0);}, [])
  useEffect(() => dispatch(studentActions.getStudioStudents(user.id)), [dispatch, user.id])

  return (
    <div className="main">
      {students != null &&
        <div>
          {Object.values(students).map(student =>
            <Link to={`/students/${student.id}`}>
              
            </Link>
          )}
        </div>
      }
    </div>
  )
}
