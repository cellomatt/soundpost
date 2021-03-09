import { useState, useEffect } from 'react';
import { enUS } from 'date-fns/locale';
import { getDay } from 'date-fns';
import { DateRangePicker, START_DATE, END_DATE } from 'react-nice-dates';
import { useSelector } from 'react-redux';
import * as lessonActions from '../../store/lesson'
import 'react-nice-dates/build/style.css';
import './LessonScheduleView.css';

export default function LessonScheduleView() {
  document.title = "Soundpost — Schedule a Lesson"
  const user = useSelector(state => state.session.user);
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [focus, setFocus] = useState(START_DATE)
  const date = new Date()

  const handleFocusChange = newFocus => {
    setFocus(newFocus || START_DATE)
  }

  const setStart = (e) => {
    setStartDate(e)
    setEndDate(null)
  }

  const modifiers = {
    noBorder: date => getDay(date) === 0
  }

  const modifiersClassNames = {
    noBorder: '-no-border'
  }

  return (
    <div className="main">
      <h1 className="title__lesson">Schedule a Lesson</h1>
      {user !== null &&
      <div>
        Select a range of dates to view {user.teacher.first_name} {user.teacher.last_name}'s available lesson times.
      </div>
      }
      <DateRangePicker
      startDate={startDate}
      endDate={endDate}
      onStartDateChange={(e) => setStart(e)}
      onEndDateChange={setEndDate}
      focus={focus}
      onFocusChange={handleFocusChange}
      minimumDate={new Date()}
      maximumDate={date.setMonth(date.getMonth() + 1)}
      minimumLength={0}
      format='MMMMMMMMM dd, yyyy'
      locale={enUS}
      modifiers={modifiers}
      modifiersClassNames={modifiersClassNames}
      >
      {({ startDateInputProps, endDateInputProps, focus }) => (
        <div className='date-range'>
          <input
            className={'input' + (focus === START_DATE ? ' -focused' : '')}
            {...startDateInputProps}
            placeholder='Start date'
          />
          <span className='date-range_arrow' />
          <input
            className={'input' + (focus === END_DATE ? ' -focused' : '')}
            {...endDateInputProps}
            placeholder='End date'
          />
        </div>
      )}
      </DateRangePicker>
      <div className="lessons__list">

      </div>
    </div>
  )
}
