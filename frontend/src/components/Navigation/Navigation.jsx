import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  const sessionLinks = sessionUser ?
    (
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    ) : (
      <>
        <li>
          <OpenModalButton
            buttonText="Log In"
            modalComponent={<LoginFormModal />}
          />
          {/* <NavLink to="/login">Log In</NavLink> */}
        </li>
        <li>
          <OpenModalButton
            buttonText="Sign Up"
            modalComponent={<SignupFormModal />}
          />
          {/* <NavLink to="/signup">Sign Up</NavLink> */}
        </li>
      </>
    );

  return (
    <div>
      <div>
        <NavLink to="/">
        <img src="https://res.cloudinary.com/dqwy6sxtc/image/upload/v1722539914/GOGC/20240207_105858_0000_exq6ro.png" alt="" /></NavLink>
      </div>
      {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;
