import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'
import {ReactComponent as Logo} from './logo.svg'

const NavBar = ({ authenticated, setAuthenticated }) => {
  return (
    <div className="navbar">
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
