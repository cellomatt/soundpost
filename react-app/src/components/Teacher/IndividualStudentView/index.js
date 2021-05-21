import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as studentActions from '../../../store/student'
import * as statsActions from '../../../store/stats'
import * as assignmentActions from '../../../store/assignment'
import * as lessonActions from '../../../store/lesson'
import AssignmentContainer from '../../AssignmentContainer'
import LessonContainer from '../../LessonContainer'
import './IndividualStudentView.css'

export default function IndividualStudentView({role}){
  const history = useHistory();
  const { studentId } = useParams();
  const studentIdNum = Number(studentId)
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const student = useSelector(state => state.students.currentStudent);
  const stats = useSelector(state => state.stats)
  const assignments = useSelector(state => state.assignments.all)
  const orderedList = Object.values(stats.days.list).sort((a, b) => b.date - a.date)
  const lessons = useSelector(state => state.lessons.scheduled)
  const options = { dateStyle: 'long'};
  const [newAssignment, setNewAssignment] = useState("");
  const [change, setChange] = useState(false);

  useEffect(() => {window.scrollTo(0, 0);}, [])
  useEffect(() => dispatch(statsActions.getAllStats(studentIdNum)), [dispatch, studentIdNum])
  useEffect(() => dispatch(lessonActions.getUserLessons(studentIdNum, !role)), [dispatch, studentIdNum, change])

  useEffect(() => {
    const getStudentInfo = async () => {
      try {
        await dispatch(studentActions.getOneStudent(studentIdNum));
      }
      catch {
        history.push("/students")
      }
    };
    getStudentInfo();
    return () => {
      dispatch(studentActions.cleanupStudent())
    }
  }, [dispatch, studentIdNum, history])

  useEffect(() => {
    dispatch(assignmentActions.getAllAssignments(studentIdNum));
    return () => {
      dispatch(assignmentActions.cleanupAssignments())
    }
  }, [dispatch, studentIdNum, change])

  const sendAssignment = async () => {
    await dispatch(assignmentActions.sendNewAssignment(user.id, studentIdNum, newAssignment));
    setNewAssignment("");
    setChange(change => !change);
  }

  return (
    <div className="main">
      <div className="dashboard_main">
        <div className="student-info__box">
          {student &&
          <>
            <h1 className="title__main student-name">{student.first_name} {student.last_name}</h1>
            <div className="user-content">
              <div className="user-info">
                <div className="student-info__container">
                  <div className="user-info__pic">
                    {student.photo_url && <img className="user-info__pic--img" src={student.photo_url} alt="profile main"/>}
                    {!student.photo_url && <img className="user-info__pic--img" src={`https://soundpost-app.s3.us-east-2.amazonaws.com/profile_icon.png`} alt="profile main"/>}
                  </div>
                  <div className="student-info__contact">
                    <h3 className="student-info__contact-item">tel: <a href="tel:+6143019973">{student.phone}</a></h3>
                    <h3 className="student-info__contact-item">email: <a href={`mailto:${student.email_address}`}>{student.email_address}</a></h3>
                    {student.parent_name && <h3 className="student-info__contact-item">parent name: <span>{student.parent_name.toLowerCase()}</span></h3>}
                  </div>
                </div>
              </div>
              <div className="student-data">
                <div className="student-data__assignments">
                  <h1 className="title student-data__title">Practice Assignments</h1>
                  <div className="assignments__list">
                    <textarea
                      id="new-assignment"
                      className="form__input"
                      placeholder="New assignment..."
                      value={newAssignment}
                      onChange={(e) => setNewAssignment(e.target.value)}>
                    </textarea>
                    <button id="assignment-submit" className="btn btn__primary" onClick={sendAssignment}>Send</button>
                    <div className="list">
                    {assignments === null &&
                          <p className="">You haven't sent any assignments yet.</p>
                          }
                    {assignments !== null &&
                    <>
                        {Object.values(assignments).map(assignment =>
                        <div key={assignment.id}>
                          <AssignmentContainer assignment={assignment} />
                        </div>
                        )}
                    </>
                    }
                    </div>
                  </div>
                </div>
                <div className="student-data__stats">
                  <h1 className="title student-data__title">Quick Stats</h1>
                  {stats.start_date != null && <div className="student-data__stats-box">
                    <p>
                      Days Practiced This Week: {stats.thisweek.count}
                    </p>
                    <p>
                      Days Practiced This Month: {stats.thismonth.count}
                    </p>
                    <p>
                      Percentage of Days Practiced (All Time): {stats.all.percentage}%
                    </p>
                    <p>
                      Soundpost Start Date: {stats.start_date.toLocaleDateString('en-US', options)}
                    </p>
                  </div>}
                </div>
                <div className="student-data__lessons">
                  <h1 className="title student-data__title">Upcoming Lessons</h1>
                  <div className="lesson-info__lessons">
                    {lessons != null &&
                      <div>
                        {Object.values(lessons).sort((a,b) => a.start_time - b.start_time).map(lesson =>
                          <LessonContainer lesson={lesson} key={lesson.id} setChange={setChange} student={role}/>
                          )}
                      </div>
                    }
                    {lessons === null &&
                      <>
                      <p>No upcoming lessons are scheduled.</p>
                      <button onClick={() => history.push("/schedule")} className="btn__primary lesson-info__btn">Book Now</button>
                      </>
                      }
                  </div>
                </div>
              </div>
            </div>
          </>
          }
        </div>
      </div>
    </div>
  )
}
