import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as studentActions from '../../../store/student'
import StudentContainer from '../StudentContainer'
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
      <div className="dashboard_main">
        <h1 className="title__main">Your Students</h1>
        <div className="all-students">
          {students != null &&
            Object.values(students).map(student =>
              <Link to={`/students/${student.id}`} className="student-link">
                <StudentContainer user={student}></StudentContainer>
              </Link>
            )
          }
        </div>
      </div>
    </div>
  )
}
