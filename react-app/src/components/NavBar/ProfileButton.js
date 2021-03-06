
import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css';

export default function ProfileButton({authenticated, setAuthenticated}) {
    // const dispatch = useDispatch();
    // const history = useHistory();

    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
      if (!showMenu) return;

      const closeMenu = () => {
        setShowMenu(false);
      };

      document.addEventListener('click', closeMenu);

      return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);


    return (
      <>
        <button className="btn btn--hamburger" onClick={openMenu}>
          <i className="fas fa-bars"></i>
        </button>
        {showMenu && (
        <ul className="dropdown">
          {authenticated &&
        <li>
          <NavLink className="default" to="/schedule" exact={true} activeClassName="active">
            Schedule Lesson
          </NavLink>
        </li>
        }
        {authenticated &&
        <li>
          <NavLink className="default" to="/assignments" exact={true} activeClassName="active">
            Assignments
          </NavLink>
        </li>
        }
        {authenticated &&
        <li>
          <NavLink className="default" to="/stats" exact={true} activeClassName="active">
            Practice Stats
          </NavLink>
        </li>
        }
        <li>
          <LogoutButton setAuthenticated={setAuthenticated} />
        </li>
        </ul>
        )}
      </>
    )
}
