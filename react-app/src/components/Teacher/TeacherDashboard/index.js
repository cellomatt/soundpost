import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import * as lessonActions from '../../../store/lesson'
import * as studentActions from '../../../store/student'
import LessonContainer from '../../LessonContainer'
import Footer from '../../Footer'
import "./TeacherDashboard.css"


export default function TeacherDashboard({student}){
  document.title = "Soundpost — Home"
  const dispatch = useDispatch();
  // const history = useHistory();
  const [change, setChange] = useState(false);
  const user = useSelector(state => state.session.user);
  const lessons = useSelector(state => state.lessons.scheduled)
  let today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  tomorrow.setHours(0, 0, 0);

  useEffect(() => {window.scrollTo(0, 0);}, [])
  useEffect(() => dispatch(lessonActions.getUserLessons(user.id, student)), [dispatch, user.id, student, change])
  useEffect(() => dispatch(studentActions.getStudioStudents(user.id)), [dispatch, user.id])


  return (
    <div className="main">
      <div className="dashboard_main">
        <div className="user-info">
          <div className="user-info__primary">
              <div className="user-info__pic">
                {user.photo_url && <img className="user-info__pic--img" src={user.photo_url} alt="profile main"/>}
                {!user.photo_url && <img className="user-info__pic--img" src={`https://soundpost-app.s3.us-east-2.amazonaws.com/profile_icon.png`} alt="profile main"/>}
              </div>
            <div className="user-info__name-practiced">
              <h1 className="user-info__name">{user.first_name} {user.last_name}</h1>
              <div className="user-info__instrument">
                {user.instrument.toLowerCase()}
              </div>
            </div>
          </div>
        </div>
        <div className="lesson-info">
          <div className="lesson-info__upcoming">
            <h1 className="title">Today's Lessons</h1>
            <div className="lesson-info__lessons">
              {lessons != null &&
                <div>
                  {Object.values(lessons).filter(lesson => lesson.start_time < tomorrow).sort((a,b) => a.start_time - b.start_time).map(lesson =>
                    <LessonContainer lesson={lesson} key={lesson.id} setChange={setChange} student={student}/>
                  )}
                </div>
              }
              {(lessons === null || !Object.values(lessons).filter(lesson => lesson.start_time < tomorrow).length) &&
                <p>You don't have any lessons scheduled for today.</p>
                }
            </div>
          </div>
          <div className="lesson-info__upcoming">
            <h1 className="title">Upcoming Lessons</h1>
            <div className="lesson-info__lessons">
              {lessons != null &&
                <div>
                  {Object.values(lessons).filter(lesson => lesson.start_time > tomorrow).sort((a,b) => a.start_time - b.start_time).map(lesson =>
                    <LessonContainer lesson={lesson} key={lesson.id} setChange={setChange} student={student}/>
                  )}
                </div>
              }
              {(lessons === null || !Object.values(lessons).filter(lesson => lesson.start_time > tomorrow).length) &&
                <p>You don't have any upcoming lessons scheduled.</p>
                }
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
