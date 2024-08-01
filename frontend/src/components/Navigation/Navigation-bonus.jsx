import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton-bonus';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='outer'>
        <NavLink to="/">
        <img className="home-logo" src="https://res.cloudinary.com/dqwy6sxtc/image/upload/v1722540416/GOGC/20230517_161813_0000_mc2t2o.png" alt="" />
        </NavLink>
        <img className='logo' src="https://res.cloudinary.com/dqwy6sxtc/image/upload/v1722543717/GOGC/label_kh1bfq.png" alt="" />
      {isLoaded && (
        <div>
          <ProfileButton user={sessionUser} />
        </div>
      )}
      </div>
  );
}

export default Navigation;
