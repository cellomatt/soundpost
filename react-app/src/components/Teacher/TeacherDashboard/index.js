import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import * as lessonActions from '../../../store/lesson'
import LessonContainer from '../../LessonContainer'
import "./TeacherDashboard.css"


export default function TeacherDashboard({student}){
  document.title = "Soundpost — Home"
  const dispatch = useDispatch();
  const history = useHistory();
  const [change, setChange] = useState(false);
  const user = useSelector(state => state.session.user);
  const lessons = useSelector(state => state.lessons.scheduled)

  useEffect(() => {window.scrollTo(0, 0);}, [])
  //get lessons for this teacher
  useEffect(() => dispatch(lessonActions.getUserLessons(user.id, student)), [dispatch, user.id, student, change])
  //render today's lessons in a different way (with student photos)

  return (
    <div className="main">
      <div className="lesson-info__upcoming">
            <h1 className="title">Upcoming Lessons</h1>
            <div className="lesson-info__lessons">
              {lessons != null &&
                <div>
                  {Object.values(lessons).map(lesson =>
                    <LessonContainer lesson={lesson} key={lesson.id} setChange={setChange}/>
                  )}
                </div>
              }
              {lessons === null &&
                <>
                <p>You don't have any lessons scheduled.</p>
                <button onClick={() => history.push("/schedule")} className="btn__primary lesson-info__btn">Book Now</button>
                </>
                }
            </div>
          </div>
    </div>
  )
}
