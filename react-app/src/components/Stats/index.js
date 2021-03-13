
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Stats.css';
import * as statsActions from '../../store/stats'

export default function Stats() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(statsActions.getAllStats(user.id))
  }, [dispatch, user])

  return (
    <div className="main">
      <h1>Stats</h1>
    </div>
  )
}
