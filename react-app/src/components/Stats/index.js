
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import LogContainer from '../LogContainer'
import Footer from '../Footer'
import './Stats.css';
import * as statsActions from '../../store/stats'

export default function Stats() {
  document.title = "Soundpost — Your Stats"
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const stats = useSelector(state => state.stats)
  const orderedList = Object.values(stats.days.list).sort((a, b) => b.date - a.date)
  const [change, setChange] = useState(false);
  const options = { dateStyle: 'long'};

  useEffect(() => {window.scrollTo(0, 0);}, [])
  useEffect(() => {dispatch(statsActions.getAllStats(user.id))}, [dispatch, user, change])


  return (
    <div className="main">
      <h1 className="title__main">Your Stats</h1>
      <div className="stats-main">
        <div className="stats-main__stats">
          <div className="user-info__stats stats__container">
            <h3 className="user-info__stats--label">Days Practiced<br></br>This Week</h3>
            <div className="graph">
              <CircularProgressbar
                value={stats.thisweek.percentage}
                text={`${stats.thisweek.count}/7`}
                styles={buildStyles(
                  {
                    pathColor: "#0061ff",
                    trailColor: "rgba(190, 190, 190, 0.746)",
                    textColor: "#0051d4",
                    fontFamily: "P22BayerW00-Universal"
                  }
                  )}
                  />
            </div>
          </div>
          <div className="user-info__stats stats__container">
            <h3 className="user-info__stats--label">Days Practiced<br></br>This Month</h3>
            <div className="graph">
              <CircularProgressbar
                value={stats.thismonth.percentage}
                text={`${stats.thismonth.percentage}%`}
                styles={buildStyles(
                  {
                    pathColor: "#0061ff",
                    trailColor: "rgba(190, 190, 190, 0.746)",
                    textColor: "#0051d4",
                    fontFamily: "P22BayerW00-Universal"
                  }
                  )}
                  />
            </div>
          </div>
          <div className="user-info__stats stats__container">
            <h3 className="user-info__stats--label">Days Practiced Since Joining Soundpost</h3>
            <div className="graph">
              <CircularProgressbar
                value={stats.all.percentage}
                text={`${stats.all.percentage}%`}
                styles={buildStyles(
                  {
                    pathColor: "#0061ff",
                    trailColor: "rgba(190, 190, 190, 0.746)",
                    textColor: "#0051d4",
                    fontFamily: "P22BayerW00-Universal"
                  }
                  )}
                  />
            </div>
          </div>
          <div className="user-info__stats stats__container">
            <h3 className="user-info__stats--label">Days on Soundpost</h3>
            <h1 className="user-info__stats--number">{stats.days.count}</h1>
          </div>
          <div className="user-info__stats stats__container">
            <h3 className="user-info__stats--label">Lessons Completed</h3>
            <h1 className="user-info__stats--number">{stats.lessons}</h1>
          </div>
        </div>
        <div className="stats-main__logs">
          <div className="logs__container">
            <h1 className="title logs__title">Practice Log</h1>
            <div className="logs__container--inner">
              <div>
              {orderedList.map(day => {
                return (
                  <LogContainer
                    key={day.date.toLocaleDateString('en-US', options)}
                    date={day.date.toLocaleDateString('en-US', options)}
                    practiced={day.practiced}
                    setChange={setChange}
                    student={user}
                    role={user.student}
                    />
                )
              })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
