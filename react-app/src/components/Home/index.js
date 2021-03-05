import { Link } from 'react-router-dom';
import './Home.css'

export default function Home() {
  document.title = "Soundpost — Home"


  return (
    <div className="main">
      <div className="section">
        <p>image placeholder</p>
        <div className="section__description">
          <h1 className="section__header">What Is Soundpost?</h1>
          <p className="section__description--content">Soundpost is a gathering place for music students and teachers
          to connect in order to schedule lessons, track progress, and ensure consistent growth and communication.
          </p>
          <button className="btn__primary section__button"><Link className="section__button--text" to="/signup">Get Started</Link></button>
        </div>
      </div>
      <div className="section">
        <div className="section__description">
          <h1 className="section__header">Schedule Lessons</h1>
          <p className="section__description--content">Students can quickly and easily choose lesson times from their teacher's availability.
          Upcoming lessons display directly in your dashboard so you'll never forget when the next one is!</p>
        </div>
        <p>image placeholder</p>
      </div>
      <div className="section">
        <p>image placeholder</p>
        <div className="section__description">
          <h1 className="section__header">Practice Effectively</h1>
          <p className="section__description--content">Soundpost makes it easy for teachers to send practice assignments
          directly to a student's dashboard. The most recent assignment displays automatically, but previous assingments are only a click away.</p>
        </div>
      </div>
      <div className="section">
        <div className="section__description">
          <h1 className="section__header">Track Your Practice</h1>
          <p className="section__description--content">With Soundpost, you can also make sure that you're practicing consistently. Students can keep a record of
          which days they practice and look at some cool stats to see how they measure up. Teachers have access to their students' stats and can use the data to
          build and encourage healthy practice habits.</p>
        </div>
        <p>image placeholder</p>
      </div>
    </div>
  )
}
