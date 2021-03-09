import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import AssignmentContainer from '../AssignmentContainer'
import LessonContainer from '../LessonContainer'
import * as assignmentActions from '../../store/assignment'
import * as lessonActions from '../../store/lesson'
import './Dashboard.css'

export default function Dashboard() {
  document.title = "Soundpost — Home"
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const latestAssignment = useSelector(state => state.assignments.latest);
  const lessons = useSelector(state => state.lessons.scheduled)

  useEffect(() => dispatch(assignmentActions.getLatest(user.id)), [dispatch, user.id])
  useEffect(() => dispatch(lessonActions.getUserLessons(user.id)), [dispatch, user.id])

  return (
    <div className="main">
      <div className="dashboard_main">
        <div className="user-info">
          <div className="user-info__pic">
            {user.photo_url && <img className="user-info__pic--img" src={user.photo_url} alt="profile main"/>}
            {!user.photo_url && <i className="fas fa-user user-info__pic--icon"></i>}
          </div>
          <h1 className="user-info__name">{user.first_name} {user.last_name}</h1>
          <div className="user-info__practiced">
            <p>checkbox component placeholder</p>
          </div>
          <div className="user-info__stats">
            <h1 className="title">Days Practiced This Week</h1>
            <p>chart placeholder</p>
          </div>
        </div>
        <div className="lesson-info">
          <div className="lesson-info__assignment">
            <h1 className="title">Practice Assignment</h1>
            <div>
              {latestAssignment != null &&
              <AssignmentContainer assignment={latestAssignment}/>
              }
              <Link exact to="/assignments" className="lesson-info__link">View previous assignments</Link>
            </div>
          </div>
          <div className="lesson-info__upcoming">
            <h1 className="title">Upcoming Lessons</h1>
            <div>
              {lessons != null &&
                <div>
                  {Object.values(lessons).map(lesson =>
                    <LessonContainer lesson={lesson} key={lesson.id}/>
                    )}
                </div>
              }
              {lessons === null &&
                <>
                <p>You don't have any lessons scheduled.</p>
                <button>Book Now</button>
                </>
                }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
