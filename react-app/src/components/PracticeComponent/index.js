import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import 
import './PracticeComponent.css'

export default function PracticeComponent() {
  const dispatch = useDispatch();
  const [practiced, setPracticed] = useState(false)

  const practiceSubmit = async () => {
    await dispatch()
  }

  return (
    <div className="checkbox__container">
      {!practiced && <button className="checkbox__button" onClick={practiceSubmit}>
        <div className="checkbox__text">Did you practice today? <i className="far fa-square"></i></div>
      </button>
      }
      {practiced && <div className="checkbox__text practiced">Keep up the good work! <i class="far fa-check-square"></i></div>}
    </div>
  )
}
