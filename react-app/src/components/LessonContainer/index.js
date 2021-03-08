import './LessonContainer.css'

export default function LessonContainer({lesson}) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const timeOptions = { timeStyle: "short" }

  return (
    <div className="lesson__container">
      {lesson.id} {lesson.start_time.toLocaleDateString('en-US', options)}
      <div>
      {lesson.start_time.toLocaleTimeString('en-US', timeOptions)} - {lesson.end_time.toLocaleTimeString('en-US', timeOptions)}
      </div>
      Teacher: {lesson.teacher.first_name} {lesson.teacher.last_name}
    </div>
  )
}
