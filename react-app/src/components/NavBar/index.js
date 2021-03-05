import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'
import {ReactComponent as Logo} from './logo.svg'
import {ReactComponent as Logo2} from './logo2.svg'


const NavBar = ({ authenticated, setAuthenticated }) => {
  const [scrolled, setScrolled] = useState(false)
  window.onscroll = function() {scroller()};

  function scroller() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    if (winScroll > 160) {
      setScrolled(true);
    } else { setScrolled(false); }
  }

  return (
    <div className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <Link className="logo" to="/">
        {!scrolled ? <Logo  /> : <Logo2 />}
      </Link>
      <nav>
      <ul className="nav">
        <li>
          <NavLink className={`default ${scrolled ? "default-scrolled" : ""}`} to="/" exact={true} activeClassName={`active ${scrolled ? "active-scrolled" : ""}`}>
            Home
          </NavLink>
        </li>
        <li>
          {!authenticated && <NavLink className={`default ${scrolled ? "default-scrolled" : ""}`} to="/login" exact={true} activeClassName={`active ${scrolled ? "active-scrolled" : ""}`}>
            Login
          </NavLink>
        }
        </li>
        <li>
          {!authenticated && <NavLink className={`default ${scrolled ? "default-scrolled" : ""}`} to="/sign-up" exact={true} activeClassName={`active ${scrolled ? "active-scrolled" : ""}`}>
            Sign Up
          </NavLink>
        }
        </li>
        <li>
          <LogoutButton setAuthenticated={setAuthenticated} scrolled={scrolled}/>
        </li>
      </ul>
      </nav>
    </div>

  );
}

export default NavBar;
