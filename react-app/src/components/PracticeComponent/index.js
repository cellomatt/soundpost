import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as practiceActions from '../../store/practice'
import './PracticeComponent.css'

export default function PracticeComponent({user}) {
  const dispatch = useDispatch();
  const [practiced, setPracticed] = useState(false)
  const practicedToday = useSelector(state => state.practice.today)

  useEffect(() => {
    dispatch(practiceActions.getPractice(user.id))
    if (practicedToday !== null) {
      setPracticed(practicedToday)
    }
  }, [dispatch, user, setPracticed, practicedToday])



  const practiceSubmit = async () => {
    await dispatch(practiceActions.practicedToday(user.id))
    setPracticed(true)
  }

  return (
    <div className="checkbox__container">
      {!practiced && <button className="checkbox__button" onClick={practiceSubmit}>
        <div className="checkbox__text">Did you practice today? <i className="far fa-square"></i></div>
      </button>
      }
      {practiced && <div className="checkbox__text practiced">Keep up the good work! <i className="far fa-check-square"></i></div>}
    </div>
  )
}
