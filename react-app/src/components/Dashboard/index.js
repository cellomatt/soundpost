import { useSelector } from 'react-redux';
import './Dashboard.css'

export default function Dashboard() {
  const user = useSelector(state => state.session.user)


  return (
    <div className="main">
      <div className="dashboard_main">
        <div className="user-info">
          <div className="user-info__pic">
            {user.photo_url && <img src={user.photo_url} alt="profile main"/>}
            {!user.photo_url && <i className="fas fa-user"></i>}
          </div>
        </div>
        <div className="lesson-info">
          <div className="lesson-info__assignment">
            <h1>Practice Assignment</h1>
            <div>
              <p>assignment placeholder</p>
              <p>link to all</p>
            </div>
          </div>
          <div className="lesson-info__upcoming">
            <h1>Upcoming Lessons</h1>
            <div>
              <p>lessons placeholder (map all upcoming)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
