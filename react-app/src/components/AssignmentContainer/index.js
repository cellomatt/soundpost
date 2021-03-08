import './AssignmentContainer.css'

export default function AssignmentContainer({assignment}) {
  return (
    <div className="message__container">
      <p className="message">{assignment.message}</p>
      <p className="message">– {assignment.created_at.month} {assignment.created_at.day}, {assignment.created_at.year}</p>
    </div>
  )
}
