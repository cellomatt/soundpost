import { useState, useEffect } from 'react';
import { enUS } from 'date-fns/locale';
import { getDay } from 'date-fns';
import { DateRangePicker, START_DATE, END_DATE } from 'react-nice-dates';
import { useSelector, useDispatch } from 'react-redux';
import LessonContainer from '../LessonContainer'
import * as lessonActions from '../../store/lesson'
import 'react-nice-dates/build/style.css';
import './LessonScheduleView.css';

export default function LessonScheduleView() {
  document.title = "Soundpost — Schedule a Lesson"
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const availability = useSelector(state => state.lessons.available)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [focus, setFocus] = useState(START_DATE)
  const [duration, setDuration] = useState()
  const date = new Date()


  useEffect(() => {
    if (startDate && endDate) {
      dispatch(lessonActions.getAvailability(user.teacher.id, startDate, endDate, duration))
    }
  }, [user, startDate, endDate, dispatch, duration])

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
    <div className="main lesson-schedule-main">
      <h1 className="title__lesson">Schedule a Lesson</h1>
      {user !== null &&
      <>
      <div>
        Select a range of dates and a lesson duration to view {user.teacher.first_name} {user.teacher.last_name}'s available lesson times.
      </div>
      <form>
        <select
          id="duration"
          value={duration}
          className="form__input duration__input"
          onChange={(e) => setDuration(e.target.value)}
          required={true}
        >
            <option defaultValue>Lesson Duration</option>
            <option value={30}>
              30 Minutes
            </option>
            <option value={60}>
              60 Minutes
            </option>
        </select>
      </form>
      </>
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
        {endDate && availability === null && <p>There are no lessons available during the selected timeframe.</p>}
        {availability !== null &&
        <>
          {Object.values(availability).map(lesson =>
            <LessonContainer lesson={lesson} key={lesson.id} duration={duration}/>
          )}
        </>
        }
      </div>
    </div>
  )
}
