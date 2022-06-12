import React from 'react';
// import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const _authenticatedFromRedux = useSelector(store => store._movie);
  const [loginDetails, setLoginDetails] = React.useState({
    email: '',
    pwd: '',
  });
  const [authenticated, setAuthenticated] = React.useState(false);
  const handleValidate = e => {
    e.preventDefault();
    if (loginDetails.email === 'cubeMovies05@bcc.tech'.trim() && loginDetails.pwd === 'dg13$#Tv56w.$3'.trim()) {
      setAuthenticated(true);
      sessionStorage.setItem('isLoggedIn', true);
      navigate('/home', { replace: true });
      // window.location.reload();
      // <Navigate to='/home'/>
      dispatch(checkAuth(true));
      // authenticated ? <Navigate to="/home" /> : <Navigate to="/" />;
    } else {
      setAuthenticated(false);
      dispatch(checkAuth(false));
      sessionStorage.setItem('isLoggedIn', false);
      // alert('try again');
      Swal.fire({
        icon: 'error',
        title: 'try again please',
        showConfirmButton: false,
    });
    }
  };
  const handleChange = r => {
    const name = r.target.name;
    const value = r.target.value;

    setLoginDetails({
      ...loginDetails,
      [name]: value,
    });
  };
  return (
    <main className="main-content">
      <div className="container">
        <div className="page">
          <div className="content">
            <div className="row">
              <div className="col-md-4">
                <h2>Log in</h2>
                <form className="contact-form" onSubmit={handleValidate} method="post">
                  <input type="text" className="email" name="email" onChange={handleChange} value={loginDetails.email} placeholder="email..." />
                  <input type="password" className="name"  name="pwd" onChange={handleChange} value={loginDetails.pwd} placeholder="pwd..." />
                  <input type="submit" value="Log In" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
