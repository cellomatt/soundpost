import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import LessonModal from '../LessonModal'
import './LessonContainer.css'

export default function LessonContainer({lesson, setChange, duration, student}) {
  const [scheduled, setScheduled] = useState(false)
  const user = useSelector(state => state.session.user)
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const timeOptions = { timeStyle: "short" }

  useEffect(() => {
    if (user != null && user.id === lesson.student_id) {
      setScheduled(true)
    }
  }, [user, lesson, setScheduled])

  return (
    <div className="lesson__container">
      <div className="lesson__container--info">
        <div className="lesson__container--date">{lesson.start_time.toLocaleDateString('en-US', options)}</div>
        <div className="lesson__container--time">{lesson.start_time.toLocaleTimeString('en-US', timeOptions)} - {lesson.end_time.toLocaleTimeString('en-US', timeOptions)}</div>
        {student &&
        <>
          <div className="lesson__container--teacher">Teacher: {lesson.teacher.first_name} {lesson.teacher.last_name}</div>
          <div className="lesson__container--teacher">Location: {lesson.teacher.street_address}</div>
          <div className="lesson__container--teacher">{lesson.teacher.city}, {lesson.teacher.state} {lesson.teacher.zip}</div>
        </>
        }
        {!student &&
        <>
          <div className="lesson__container--student">Student: {lesson.student.first_name} {lesson.student.last_name}</div>
        </>
        }
      </div>
      <div className="lesson__container--modal">
        <LessonModal lesson={lesson} scheduled={scheduled} setScheduled={setScheduled} setChange={setChange} duration={duration} user={user}/>
      </div>
    </div>
  )
}
