import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import ProfileButton from './ProfileButton'
import './NavBar.css'
import {ReactComponent as Logo} from './logo.svg'
import {ReactComponent as Logo2} from './logo2.svg'


const NavBar = ({ authenticated, setAuthenticated }) => {
  const [scrolled, setScrolled] = useState(false)
  window.onscroll = function() {scroller()};

  function scroller() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    if (winScroll > 140) {
      setScrolled(true);
    } else { setScrolled(false); }
  }

  let sessionLinks;
  if (authenticated) {
    sessionLinks = (
      <ProfileButton authenticated={authenticated} setAuthenticated={setAuthenticated}/>
    );
  } else {
    sessionLinks = (
      <>
      <li>
        <NavLink className={`default ${scrolled ? "default-scrolled" : ""}`} to="/login" exact={true} activeClassName={`active ${scrolled ? "active-scrolled" : ""}`}>
          Login
        </NavLink>
      </li>
      <li>
        <NavLink className={`default ${scrolled ? "default-scrolled" : ""}`} to="/signup" exact={true} activeClassName={`active ${scrolled ? "active-scrolled" : ""}`}>
          Sign Up
        </NavLink>
      </li>
      </>
    )
  }

  return (
    <div className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <Link className="logo" to="/">
        {!scrolled ? <Logo  /> : <Logo2 />}
      </Link>
      <nav>
      <ul className="nav">
        {!authenticated && <li>
          <NavLink className={`default ${scrolled ? "default-scrolled" : ""}`} to="/" exact={true} activeClassName={`active ${scrolled ? "active-scrolled" : ""}`}>
            Home
          </NavLink>
        </li>
        }
        {sessionLinks}
      </ul>
      </nav>
    </div>
  );
}

export default NavBar;
