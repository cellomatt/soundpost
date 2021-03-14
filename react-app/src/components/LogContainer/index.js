// import {useState} from 'react'
import './LogContainer.css'

export default function LogContainer({date, practiced}) {

  return (
    <div className="log__container">
    <p>{date}</p>
    <p>I practiced: {practiced ? "true" : "false"}</p>
    </div>
  )
}
