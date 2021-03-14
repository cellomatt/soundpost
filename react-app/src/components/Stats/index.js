
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import './Stats.css';
import * as statsActions from '../../store/stats'

export default function Stats() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const stats = useSelector(state => state.stats)

  useEffect(() => {
    dispatch(statsActions.getAllStats(user.id))
  }, [dispatch, user])

  return (
    <div className="main">
      <h1 className="title__main">Stats</h1>
      <div className="stats-main">
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
          <h3 className="user-info__stats--label">Days Practiced Since You Joined Soundpost</h3>
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
          <h1 className="user-info__stats--number">{stats.days}</h1>
        </div>
        <div className="user-info__stats stats__container">
          <h3 className="user-info__stats--label">Lessons Completed</h3>
          <h1 className="user-info__stats--number">{stats.lessons}</h1>
        </div>
      </div>
    </div>
  )
}
