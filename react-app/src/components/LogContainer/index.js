import {useState} from 'react'
import PracticeModal from '../PracticeModal'
import './LogContainer.css'

export default function LogContainer({date, practiced, setChange, student}) {
  const [practice, setPractice] = useState(practiced)

  return (
    <div className="log__container">
      <div className="log__container--info">
        <p className="log__container--date">{date}</p>
        <p className="log__container--practiced">Practiced: {practice ? <i className="far fa-check-square green"></i> : <i className="fas fa-times-circle red"></i>}</p>
      </div>
      <div className="log__container--modal">
        <PracticeModal practice={practice} setPractice={setPractice} date={date} setChange={setChange} student={student}/>
      </div>
    </div>
  )
}
