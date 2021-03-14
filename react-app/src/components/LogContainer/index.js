import './LogContainer.css'

export default function LogContainer({date, practiced}) {
  return (
    <>
    <p>{date}</p>
    <p>I practiced: {practiced}</p>
    </>
  )
}
