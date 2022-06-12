import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

// components
import Form from './components/AddMovieForm';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Movie from './components/MoviePage';
import NotFound from './components/404NotFound';
import PrivateRoutes from "./auth/PrivateRoute";
import NetlifyLogin from "./components/netlifyLogin";

const RoutesComp = () => {
  
    let confirmAuth = useSelector(store => store._movie.authenticated);
    let auth = JSON.parse(sessionStorage.getItem('isLoggedIn'));
    confirmAuth = confirmAuth ? confirmAuth : auth;
  
    return (
      <Routes>
        <Route path="/" exact element={<NetlifyLogin />} />
        {/* --------------------------------------- */}
        
            <Route path="/home" exact element={
                <PrivateRoutes>
                    <Home />
                </PrivateRoutes>
            } />
            <Route path="/add-movie" exact element={
                <PrivateRoutes>
                    <Form />
                </PrivateRoutes>
            } />
            <Route path="/about" exact element={
                <PrivateRoutes>
                    <About />
                </PrivateRoutes>
            } />
            <Route path="/movie/:id" exact element={
                <PrivateRoutes>
                    <Movie />
                </PrivateRoutes>
            } />
        
        
        <Route path='*' element={<NotFound />} />
      </Routes>
    );
  };

  export default RoutesComp;

//  these both are same
// way 1
{/* <Route
    path="/protected"
    element={
        <RequireAuth>
            <ProtectedPage />
        </RequireAuth>
    }
/> */}

// way 1
{/* <Routes>
    <Route path="/home" element={<Private />}>
        <Route path="/home" element={<Home />} />
    </ Route>
</Routes> */}


// way 2 detialed
{/* <Route path="/" element={<ProtectedRoutes />}>
    <Route path="/" element={<InnerContent />}>
        <Route path="/" element={<Navigate replace to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="tabs" element={<Tabs />}>
            <Route path="/tabs" element={<Navigate replace to="tab1" />} />
            <Route path="tab1" element={<Tab1 />} />
            <Route path="tab2" element={<Tab2 />} />
            <Route path="tab3" element={<Tab3 />} />
        </Route>
        <Route path="settings" element={<Settings />} />
        <Route path="users" element={<Users extraItem="test extra item from router" />} />
        <Route path="users/:userId" element={<SingleUser />} />
        <Route path="users/new" element={<NewUser />} />

    </Route>
</Route>        */}