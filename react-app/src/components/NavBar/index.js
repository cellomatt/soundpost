import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'
import {ReactComponent as Logo} from './logo.svg'


const NavBar = ({ authenticated, setAuthenticated }) => {
  const [scrolled, setScrolled] = useState(false)
  window.onscroll = function() {scroller()};

  function scroller() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    // let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (winScroll > 160) {
      setScrolled(true);
    } else { setScrolled(false); }
    console.log(winScroll);
    // document.getElementById("myBar").style.width = scrolled + "%";
  }

  return (
    <div className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <Link className="logo" to="/">
        <Logo  />
      </Link>
      <nav>
      <ul className="nav">
        <li>
          <NavLink className="default" to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          {!authenticated && <NavLink className="default" to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        }
        </li>
        <li>
          {!authenticated && <NavLink className="default" to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        }
        </li>
        <li>
          <LogoutButton setAuthenticated={setAuthenticated} />
        </li>
      </ul>
      </nav>
    </div>

  );
}

export default NavBar;
