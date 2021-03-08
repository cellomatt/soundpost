import './LessonContainer.css'

export default function LessonContainer({lesson}) {
  return (
    <div className="lesson__container">
      {lesson.id}
    </div>
  )
}
