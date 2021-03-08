import './AssignmentContainer.css'

export default function AssignmentContainer({assignment}) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  return (
    <div className="message__container">
      <p className="message">{assignment.message}</p>
      <p className="message">– {assignment.teacher.first_name} {assignment.teacher.last_name}</p>
      <p className="">{assignment.created_at.toLocaleDateString('en-US', options)}</p>
    </div>
  )
}
