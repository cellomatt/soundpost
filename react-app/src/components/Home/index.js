import { Link } from 'react-router-dom';
import './Home.css'
import {ReactComponent as Calendar} from './calendar.svg';
import {ReactComponent as Checkmark} from './checkmark.svg';
import {ReactComponent as Music} from './music.svg';
import {ReactComponent as MusicNote} from './music-note.svg';
import githubLogo from './GitHub-Mark-Light-120px-plus.png'
import linkedinLogo from './LI-In-Bug.png'

export default function Home() {
  document.title = "Soundpost — Home"


  return (
    <>
    <div className="main">
      <div className="home__main">
        <div className="section one">
          <div className="section__description">
            <h1 className="section__header">What Is Soundpost?</h1>
            <p className="section__description--content">Soundpost is a gathering place for music students and teachers
            to schedule lessons, track progress, and ensure consistent growth and communication.
            </p>
            <button className="btn__primary section__button"><Link className="section__button--text" to="/signup">Get Started</Link></button>
          </div>
          <MusicNote className="section__svg"/>
        </div>
        <div className="section two">
          <Calendar className="section__svg"/>
          <div className="section__description">
            <h1 className="section__header">Schedule Lessons</h1>
            <p className="section__description--content">Students can quickly and easily choose lesson times from their teacher's availability.
            Upcoming lessons display directly in your dashboard so you'll never forget when the next one is!</p>
          </div>
        </div>
        <div className="section three">
          <div className="section__description">
            <h1 className="section__header">Track Your Practice</h1>
            <p className="section__description--content">With Soundpost, you can make sure that you're practicing consistently. Students can keep a record of
            which days they practice and look at some cool stats to see how they measure up. Teachers have access to their students' stats and can use the data to
            build and encourage healthy practice habits.</p>
          </div>
          <Checkmark className="section__svg"/>
        </div>
        <div className="section four">
          <Music className="section__svg"/>
          <div className="section__description">
            <h1 className="section__header">Practice Effectively</h1>
            <p className="section__description--content">Soundpost makes it easy for teachers to send practice assignments
            directly to a student's dashboard. The most recent assignment displays automatically, but previous assignments are only a click away.</p>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="about">
          <img src="https://soundpost-app.s3.us-east-2.amazonaws.com/matt-1.jpg" className="footer__img"></img>
          <div className="about__info">
            <p>Designed and developed by Matt Kufchak</p>
            <p>Copyright © 2021</p>
          </div>
        </div>
        <a target="_blank" rel="noreferrer" href="https://github.com/cellomatt">
          <div className="github">
          <img src={githubLogo} className="footer__img"></img>
            <div className="github__info">
              <p>Find me on GitHub</p>
            </div>
          </div>
        </a>
        <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/mattkufchak/">
          <div className="linkedin">
          <img src={linkedinLogo} className="footer__img"></img>
            <div className="linkedin__info">
              <p>Connect with me on LinkedIn</p>
            </div>
          </div>
        </a>
      </div>
    </div>
    </>
  )
}
