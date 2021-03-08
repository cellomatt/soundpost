

export default function Assignment({assignment}) {
  return (
    <div>
      <p>{assignment.message}</p>
      <p>{assignment.created_at.month} {assignment.created_at.day}, {assignment.created_at.year}</p>
    </div>
  )
}
