import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import AssignmentContainer from '../AssignmentContainer'
import LessonContainer from '../LessonContainer'
import PracticeComponent from '../PracticeComponent'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import * as assignmentActions from '../../store/assignment'
import * as lessonActions from '../../store/lesson'
import * as statsActions from '../../store/stats'
import './Dashboard.css'
import 'react-circular-progressbar/dist/styles.css';

export default function Dashboard() {
  document.title = "Soundpost — Home"
  const dispatch = useDispatch();
  const history = useHistory();
  const [change, setChange] = useState(false);
  const user = useSelector(state => state.session.user);
  const latestAssignment = useSelector(state => state.assignments.latest);
  const lessons = useSelector(state => state.lessons.scheduled)
  const stats = useSelector(state => state.stats.thisweek)

  useEffect(() => dispatch(assignmentActions.getLatest(user.id)), [dispatch, user.id])
  useEffect(() => dispatch(statsActions.getWeeklyPractice(user.id)), [dispatch, user.id, change])
  useEffect(() => dispatch(lessonActions.getUserLessons(user.id)), [dispatch, user.id, change])
  useEffect(() => dispatch(statsActions.getAllStats(user.id)), [dispatch, user.id, change])



  return (
    <div className="main">
      <div className="dashboard_main">
        <div className="user-info">
          <div className="user-info__primary">
            <div className="user-info__pic">
              {user.photo_url && <img className="user-info__pic--img" src={user.photo_url} alt="profile main"/>}
              {!user.photo_url && <img className="user-info__pic--img" src={`https://soundpost-app.s3.us-east-2.amazonaws.com/profile_icon.png`} alt="profile main"/>}
            </div>
            <h1 className="user-info__name">{user.first_name} {user.last_name}</h1>
            <div className="user-info__practiced">
              <PracticeComponent user={user} setChange={setChange} />
            </div>
          </div>
        </div>
        <div className="lesson-info">
          <div className="lesson-info__assignment">
            <h1 className="title">Practice Assignment</h1>
            <div>
              {latestAssignment !== null &&
              <>
              <AssignmentContainer assignment={latestAssignment}/>
              <Link exact to="/assignments" className="lesson-info__link">View previous assignments</Link>
              </>
              }
              {latestAssignment === null &&
              <p className="">You don't have any assignments yet.</p>
              }
            </div>
          </div>
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
      </div>
    </div>
  )
}
