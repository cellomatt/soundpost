import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as studentActions from '../../../store/student'
import * as statsActions from '../../../store/stats'
import * as assignmentActions from '../../../store/assignment'
import * as lessonActions from '../../../store/lesson'
import AssignmentContainer from '../../AssignmentContainer'
import LessonContainer from '../../LessonContainer'
import LogContainer from '../../LogContainer'
import Footer from '../../Footer'
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

  if (student != null) {
    document.title = `Soundpost — ${student.first_name} ${student.last_name}`
  }

  useEffect(() => {window.scrollTo(0, 0);}, [])
  useEffect(() => dispatch(lessonActions.getUserLessons(studentIdNum, !role)), [dispatch, studentIdNum, change, role])

  useEffect(() => {
    dispatch(statsActions.getAllStats(studentIdNum))
  }, [dispatch, studentIdNum])

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
      dispatch(assignmentActions.cleanupAssignments())
      dispatch(statsActions.cleanupStats())
    }
  }, [dispatch, studentIdNum, history])

  useEffect(() => {
    dispatch(assignmentActions.getAllAssignments(studentIdNum));
  }, [dispatch, studentIdNum, change])

  const sendAssignment = () => {
    dispatch(assignmentActions.sendNewAssignment(user.id, studentIdNum, newAssignment));
    setNewAssignment("");
    setChange((change) => !change);
  }

  return (
    <div className="main">
      <div className="dashboard_main">
        <div className="indstudent-info__box">
          {student &&
          <>
            <h1 className="title__main student-name">{student.first_name} {student.last_name}</h1>
            <div className="user-content">
              <div className="indstudent-info">
                <div className="indstudent-info__container">
                  <div className="indstudent-info__pic">
                    {student.photo_url && <img className="indstudent-info__pic--img" src={student.photo_url} alt="profile main"/>}
                    {!student.photo_url && <img className="indstudent-info__pic--img" src={`https://soundpost-app.s3.us-east-2.amazonaws.com/profile_icon.png`} alt="profile main"/>}
                  </div>
                  <div className="indstudent-info__contact">
                    <h3 className="indstudent-info__contact-item">tel: <a href="tel:+6143019973">{student.phone}</a></h3>
                    <h3 className="indstudent-info__contact-item">email: <a href={`mailto:${student.email_address}`}>{student.email_address}</a></h3>
                    {student.parent_name && <h3 className="indstudent-info__contact-item">parent: <span>{student.parent_name.toLowerCase()}</span></h3>}
                  </div>
                </div>
                <div className="send-assignment">
                  <textarea
                      id="new-assignment"
                      className="form__input"
                      placeholder="Send a new assignment..."
                      value={newAssignment}
                      onChange={(e) => setNewAssignment(e.target.value)}>
                    </textarea>
                    <button id="assignment-submit" className="btn btn__primary" onClick={sendAssignment}>Send</button>
                </div>
              </div>
              <div className="student-data">
                <div className="student-data__assignments">
                  <h1 className="title student-data__title">Practice Assignments</h1>
                  <div className="assignments__list">
                    <div className="list">
                    {assignments === null &&
                          <p className="">You haven't sent any assignments yet.</p>
                          }
                    {assignments !== null &&
                    <>
                        {Object.values(assignments).map(assignment =>
                        <div key={assignment.id}>
                          <AssignmentContainer assignment={assignment} role={user.student} setChange={setChange}/>
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
                      Days Practiced This Week: <span>{stats.thisweek.count}</span>
                    </p>
                    <p>
                      Days Practiced This Month: <span>{stats.thismonth.count}</span>
                    </p>
                    <p>
                      Percentage of Days Practiced (All Time): <span>{stats.all.percentage}%</span>
                    </p>
                    <p>
                      Completed Lessons: <span>{stats.lessons}</span>
                    </p>
                    <p>
                      Soundpost Start Date: <span>{stats.start_date.toLocaleDateString('en-US', options)}</span>
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
                      <p>No upcoming lessons are scheduled.</p>
                      }
                  </div>
                </div>
                <div className="student-data__log">
                  <h1 className="title student-data__title">Practice Log</h1>
                  <div className="student-data__log--inner ">
                    <div>
                    {orderedList.map(day => {
                      return (
                        <LogContainer
                          key={day.date.toLocaleDateString('en-US', options)}
                          date={day.date.toLocaleDateString('en-US', options)}
                          practiced={day.practiced}
                          setChange={setChange}
                          student={student}
                          role={role}
                          />
                      )
                    })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
          }
        </div>
      </div>
      <Footer />
    </div>
  )
}
