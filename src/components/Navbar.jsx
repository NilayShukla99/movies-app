import React, { useState } from 'react';
import { Link, NavLink, useMatch } from 'react-router-dom';
import Searchbar from './Searchbar';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth } from '../redux/actions';
import { useNavigate, useLocation, useHref, useRoutes } from 'react-router-dom';
import logo from '../images/logo.png';
import netlifyIdentity from 'netlify-identity-widget';

// + style={({ isActive }) => ({ color: isActive ? 'green' : 'blue' })}

const NavbarComponent = props => {
  // const auth = useSelector(store => store._movie.authenticated);
  const [show , setShow] = useState(props.showSearch);  
  let store = useSelector(store => store._movie);
  const user = store.user ? store.user : window.localStorage.getItem('gotrue.user');
  let auth = store.authenticated || Boolean(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const title = auth ? 'Logout' : 'Login';
  const handleAuth = () => {
    
    // auth && dispatch(checkAuth(false));
    if (auth && title === 'Logout') {
      // <Navigate to='/' replace/>
      
      navigate('/', { replace: true });
      dispatch(checkAuth(false));
      netlifyIdentity.logout()
      // window.location.reload();
    }
  }
  let path = window.location.pathname;
  React.useEffect(() => {
    path = window.location.pathname;
    if (path === '/home') {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [path]);

  // change location
  const navigateTo = loc => {
    navigate(loc, { replace: true });
  }
  // style for active link
  const activeStyle = isActive => {
    return {
      textDecoration: isActive ? 'solid underline #ffaa3c' : 'none',
      color: isActive ? '#1a1c1e' : '#84878d',
      fontWeight: isActive ? '650' : 'unset',
      paddingBottom: isActive ? '7px' : '',
    }
  };

  // show and hide menu and search
  const diplayMenu = () => {
    const menu = document.querySelector('.menu');
    const ul = document.querySelectorAll('.menu-item');
    if (menu.style.display.includes('none') || menu.style.display === '') {
      menu.style.display = 'block';
    } else {
      menu.style.display = 'none';
    }
  }

  return (
    <header className="site-header">
    <div className="container">
      <Link to={auth ? `/home` : location.pathname } id="branding">
        <img src={logo} alt="cube movies" className="logo" />
        <div className="logo-copy">
          <h1 className="site-title">{props.companyName}</h1>
          {/* <small className="site-description">Tagline goes here</small> */}
        </div>
      </Link>

        {
          user && <div className="main-navigation">
            <button type="button" className="menu-toggle" onClick={diplayMenu}><i className="fa fa-bars"></i></button>
            <ul className="menu">
              <li className="menu-item"><NavLink style={({ isActive }) => (activeStyle(isActive))} to="/home">Home</NavLink></li>
              <li className="menu-item"><NavLink style={({ isActive }) => (activeStyle(isActive))} to="/add-movie">Add Movie</NavLink></li>
              <li className="menu-item"><NavLink style={({ isActive }) => (activeStyle(isActive))} to="/about">About</NavLink></li>
              <li className="menu-item"><a style={{cursor: 'pointer'}} onClick={handleAuth}>{title}</a></li>
            </ul>

            <div className="search-form">
            {/* <button onClick={showSearchbar}><i className="fa fa-search"></i></button> */}
            <button onClick={() => navigateTo("/add-movie")} style={{
              width: '50px'
            }}><i className="fa fa-plus"></i></button>
            </div>
          </div>
        }

      <div className="mobile-navigation"></div>
    </div>
    {auth && show && <Searchbar placeholder="Movies/ Category" title="at least two words of long movie name separated by spaces"/>}
  </header>
  )
};

export default NavbarComponent;
