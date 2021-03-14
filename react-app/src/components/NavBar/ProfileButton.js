
import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css';

export default function ProfileButton({setAuthenticated}) {
    // const dispatch = useDispatch();
    // const history = useHistory();
    const user = useSelector(state => state.session.user)

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
        <button className="btn__profile" onClick={openMenu}>
          {/* {user.photo_url && <img className="btn__profile--img" src={user.photo_url} alt="profile"/>} */}
          {/* {!user.photo_url && */}
          <i className="fas fa-user btn__profile--icon"></i>
          {/* } */}
        </button>
        {showMenu && (
        <ul className="dropdown">
          <li className="dropdown_li">
            <NavLink className="default" exact to="/" activeClassName="active">
              Dashboard
            </NavLink>
          </li>
          <li className="dropdown_li">
            <NavLink className="default" exact to="/schedule" activeClassName="active">
              Schedule Lesson
            </NavLink>
          </li>
          <li className="dropdown_li">
            <NavLink className="default" exact to="/assignments" activeClassName="active">
              Assignments
            </NavLink>
          </li>
          <li className="dropdown_li">
            <NavLink className="default" exact to="/stats" activeClassName="active">
              Your Stats
            </NavLink>
          </li>
          <li className="dropdown_li">
            <LogoutButton setAuthenticated={setAuthenticated} />
          </li>
        </ul>
        )}
      </>
    )
}
