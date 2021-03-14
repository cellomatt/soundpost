
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import './Stats.css';
import * as statsActions from '../../store/stats'

export default function Stats() {
  document.title = "Soundpost — Your Stats"
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const stats = useSelector(state => state.stats)
  let logs = []


  const getLogs = () => {
    if (stats.all.logs && stats.start_date) {
      let currentDate = stats.start_date;

      Date.prototype.addDays = function(days) {
        let date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      }

      while (currentDate <= new Date()) {
          logs.push({date: new Date (currentDate), practiced: false});
          currentDate = currentDate.addDays(1);
      }

      logs.forEach(log => {
        if (log.date in stats.all.logs) {
          log.practiced = true
        }
      })
    }
  }

  useEffect(() => {
    dispatch(statsActions.getAllStats(user.id))
  }, [dispatch, user])

  useEffect(() => {
    getLogs()
    console.log(logs)
  }, [getLogs(), stats])

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
        <div className="stats-main__logs">
          <div className="logs__container">
            <h1 className="title logs__title">Practice Log</h1>
            <div className="logs__container--inner">
              {/* {logs.length &&

              } */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
