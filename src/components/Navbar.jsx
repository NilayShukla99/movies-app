import React, { useState } from 'react';
import { Link, NavLink, useMatch } from 'react-router-dom';
import Searchbar from './Searchbar';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth } from '../redux/actions';
import { useNavigate, useLocation, useHref, useRoutes } from 'react-router-dom';
import logo from '../images/logo.png';

// + style={({ isActive }) => ({ color: isActive ? 'green' : 'blue' })}

const NavbarComponent = props => {
  // const auth = useSelector(store => store._movie.authenticated);
  const [show , setShow] = useState(props.showSearch);
  let auth = sessionStorage.getItem('isLoggedIn');
  auth = auth && auth.includes('true') ? true : false;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const title = auth ? 'Logout' : 'Login';
  const handleAuth = () => {
    // isLoggedIn
    const token = auth;
    
    // auth && dispatch(checkAuth(false));
    if (auth && title === 'Logout') {
      // <Navigate to='/' replace/>
      
      navigate('/', { replace: true });
      sessionStorage.setItem('isLoggedIn', false);
      dispatch(checkAuth(false));
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
  // return (
  //   <>
  //     {auth && <Navbar bg="light" expand="lg">
  //       <Container fluid>
  //         <Navbar.Brand as={Link} to="/home">
  //           {/* <Navbar.Brand as={Link} to="/"> */}
  //           Movies App
  //         </Navbar.Brand>
  //         {/* <Button as={Link} to='/add-movie' variant='success'>Add</Button> */}
  //         <Navbar.Toggle aria-controls="navbarScroll" />
  //         <Navbar.Collapse id="navbarScroll">
  //           <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
  //             <Nav.Link
  //               as={NavLink}
  //               to="/home"
  //               style={({ isActive }) => ({
  //                 textDecoration: isActive ? 'dashed underline #3e6efd' : 'none',
  //                 color: isActive ? '#3e6efd' : '#0000008c',
  //                 textDecorationThickness: isActive ? '3px' : 'unset',
  //                 fontWeight: isActive ? '650' : 'unset',
  //                 paddingBottom: isActive ? '7px' : '',
  //               })}
  //             >
  //               Home
  //             </Nav.Link>
  //             <Nav.Link
  //               as={NavLink}
  //               to="/add-movie"
  //               style={({ isActive }) => ({
  //                 textDecoration: isActive ? 'dashed underline #3e6efd' : 'none',
  //                 color: isActive ? '#3e6efd' : '#0000008c',
  //                 textDecorationThickness: isActive ? '3px' : 'unset',
  //                 fontWeight: isActive ? '650' : 'unset',
  //                 paddingBottom: isActive ? '7px' : '',
  //               })}
  //             >
  //               Add Movie
  //             </Nav.Link>
  //             <Nav.Link
  //               as={NavLink}
  //               to="/about"
  //               style={({ isActive }) => ({
  //                 textDecoration: isActive ? 'dashed underline #3e6efd' : 'none',
  //                 color: isActive ? '#3e6efd' : '#0000008c',
  //                 textDecorationThickness: isActive ? '3px' : 'unset',
  //                 fontWeight: isActive ? '650' : 'unset',
  //                 paddingBottom: isActive ? '7px' : '',
  //               })}
  //             >
  //               About
  //             </Nav.Link>
  //             <Nav.Link
  //               // as={Link} to="/"
  //               onClick={handleAuth}
  //             >
  //               {title}
  //             </Nav.Link>
  //             {/* <NavDropdown title={title} id="navbarScrollingDropdown">
  //               <NavDropdown.Item as={Link} to="/" onClick={handleAuth}>
  //                 {' '}
  //                 {auth ? 'LogOut' : 'Login'}{' '}
  //               </NavDropdown.Item>
  //             </NavDropdown> */}
  //           </Nav>
  //           <div className="d-flex">
  //             <Searchbar searchBtn placeholder="Search... movie name" />
  //           </div>
  //         </Navbar.Collapse>
  //       </Container>
  //     </Navbar>}
  //   </>
  // );

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
          auth && <div className="main-navigation">
            <button type="button" className="menu-toggle" onClick={diplayMenu}><i className="fa fa-bars"></i></button>
            <ul className="menu">
              <li className="menu-item"><NavLink style={({ isActive }) => (activeStyle(isActive))} to="/home">Home</NavLink></li>
              <li className="menu-item"><NavLink style={({ isActive }) => (activeStyle(isActive))} to="/add-movie">Add Movie</NavLink></li>
              <li className="menu-item"><NavLink style={({ isActive }) => (activeStyle(isActive))} to="/about">About</NavLink></li>
              <li className="menu-item"><a onClick={handleAuth}>{title}</a></li>
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
