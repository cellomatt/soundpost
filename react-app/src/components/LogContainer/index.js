// import {useState} from 'react'
import './LogContainer.css'

export default function LogContainer({date, practiced}) {

  return (
    <div className="log__container">
    <p className="log__container--date">{date}</p>
    <p className="log__container--practiced">Practiced: {practiced ? <i className="far fa-check-square green"></i> : <i className="fas fa-times-circle red"></i>}</p>
    </div>
  )
}
