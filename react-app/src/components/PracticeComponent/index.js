import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as practiceActions from '../../store/practice'
import './PracticeComponent.css'

export default function PracticeComponent({user, setChange}) {
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
    setChange(change => !change)
  }

  return (
    <>
    {practicedToday !== null &&
    <div className={`checkbox__container ${practiced ? "practiced" : ""}`}>
      {!practiced && <button className="checkbox__button" onClick={practiceSubmit}>
        <div className="checkbox__text">Did you practice today?</div>
      </button>
      }
      {practiced && <div className="checkbox__text ">Keep up the good work! <i className="far fa-check-square"></i></div>}
    </div>
    }
    </>
  )
}
