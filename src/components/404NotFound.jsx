import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NotFound = () => {
    let confirmAuth = useSelector(store => store._movie.authenticated);
    let auth = JSON.parse(sessionStorage.getItem('isLoggedIn'));
    confirmAuth = confirmAuth ? confirmAuth : auth;

    // for url validation
    const location = useLocation();

    const navigate = useNavigate();
    if (confirmAuth) {
        if (location.pathname.includes('/movie')) {
            const movieId_index = location.pathname.lastIndexOf('/');
            const id = movieId_index.slice(movieId_index + 1);
            navigate(`/movie/${id}`, { replace: true });
        } else {
            navigate('/home', { replace: true });
        }
    }
    return (
        <>
            <main class="main-content">
                <div class="container">
                    <div class="page">
                        {/* <div class="breadcrumbs">
							<a href="index.html">Home</a>
							<span>NotFound us</span>
						</div> */}
                        <h2> 404 Not Found</h2>
                        <div class="row">
                            <div class="col-md-8">
                                <p class="leading">Go back to&nbsp;
                                {confirmAuth ? <Link to='/home'>Home</Link>
                                : <Link to='/'>Login</Link>}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default NotFound;