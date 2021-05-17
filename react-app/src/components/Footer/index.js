import './Footer.css'
import githubLogo from './GitHub-Mark-Light-120px-plus.png'
import linkedinLogo from './LI-In-Bug.png'

export default function Footer() {
  return (
    <div className="footer">
        <div className="about">
          <img src="https://soundpost-app.s3.us-east-2.amazonaws.com/matt-1.jpg" alt="Matt Kufchak headshot" className="footer__img"></img>
          <div className="about__info">
            <p>Designed and developed by Matt Kufchak</p>
            <p>Copyright © 2021</p>
          </div>
        </div>
        <a target="_blank" rel="noreferrer" href="https://github.com/cellomatt">
          <div className="github">
          <img src={githubLogo} alt="github logo" className="footer__img"></img>
            <div className="github__info">
              <p>Find me on GitHub</p>
            </div>
          </div>
        </a>
        <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/mattkufchak/">
          <div className="linkedin">
          <img src={linkedinLogo} alt="linkedin logo"className="footer__img"></img>
            <div className="linkedin__info">
              <p>Connect with me on LinkedIn</p>
            </div>
          </div>
        </a>
      </div>
  )
}
