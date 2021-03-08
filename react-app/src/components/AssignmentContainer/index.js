import './AssignmentContainer.css'

export default function AssignmentContainer({assignment}) {
  const options = { dateStyle: 'long'};

  return (
    <div className="message__container">
      <p className="message">{assignment.message}</p>
      <p className="message">– {assignment.teacher.first_name} {assignment.teacher.last_name}</p>
      <p className="message__date">{assignment.created_at.toLocaleDateString('en-US', options)}</p>
    </div>
  )
}
