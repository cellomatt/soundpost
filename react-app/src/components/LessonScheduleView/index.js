import { useState } from 'react';
import { enUS } from 'date-fns/locale';
import { getDay } from 'date-fns';
import { DateRangePicker, START_DATE, END_DATE } from 'react-nice-dates';
import { useSelector } from 'react-redux';
import 'react-nice-dates/build/style.css';
import './LessonScheduleView.css';

export default function LessonScheduleView() {
  document.title = "Soundpost — Schedule a Lesson"
  const user = useSelector(state => state.session.user);
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [focus, setFocus] = useState(START_DATE)
  const date = new Date()

  const handleFocusChange = newFocus => {
    setFocus(newFocus || START_DATE)
  }

  const modifiers = {
    // disabled: date => getDay(date) < new Date()
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
      onStartDateChange={setStartDate}
      onEndDateChange={setEndDate}
      focus={focus}
      onFocusChange={handleFocusChange}
      minimumDate={new Date()}
      maximumDate={date.setMonth(date.getMonth() + 1)}
      minimumLength={1}
      format='MMMMMMMMM dd, yyyy'
      locale={enUS}
      modifiers={modifiers}
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
    </div>
  )
}
