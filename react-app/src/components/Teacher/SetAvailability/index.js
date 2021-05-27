import { useState, useEffect } from 'react';
import { enUS } from 'date-fns/locale';
import { getDay } from 'date-fns';
import { DateRangePickerCalendar, START_DATE, END_DATE } from 'react-nice-dates';
import { useSelector, useDispatch } from 'react-redux';
import Footer from '../../Footer'
import * as lessonActions from '../../../store/lesson'
import 'react-nice-dates/build/style.css';
import './SetAvailability.css'

export default function SetAvailability() {
  document.title = "Soundpost — Set Availability"

  useEffect(() => {window.scrollTo(0, 0);}, [])

  return (
    <div className="main">
      <h1>Coming Soon!</h1>
      <Footer/>
    </div>
  )
}
