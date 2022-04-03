// import './App.css';
// import './index.css';
import React from 'react';
import Form from './components/AddMovieForm';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './components/About';
import Login from './components/Login';
import Movie from './components/MoviePage';
import NotFound from './components/404NotFound';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import 'react-bootstrap-typeahead/css/Typeahead.css';


// const url = window.location.href;
// const i = url.lastIndexOf('/');
// console.log(i);
// if (url.slice(i, url.length) === '/' && i === 21) {
  // <Navigate to='/home' replace/>
  // window.location.replace(`/home`);
// }

const RoutesComp = () => {
  // const dispatch = useDispatch();
  // // isLoggedIn
  // const token = sessionStorage.getItem('isLoggedIn').includes('true') ? true : false;

  let confirmAuth = useSelector(store => store._movie.authenticated);
  let auth = JSON.parse(sessionStorage.getItem('isLoggedIn'));
  confirmAuth = confirmAuth ? confirmAuth : auth;

  // auth = auth && auth.includes('true') ? true : false;
  return (
    <Routes>
      <Route path="/" exact element={<Login />} />
      {/* --------------------------------------- */}
      {confirmAuth && <Route path="/home" exact element={<Home />} />}
      {confirmAuth && <Route path="/add-movie" exact element={<Form />} />}
      {confirmAuth && <Route path="/about" exact element={<About />} />}
      {confirmAuth && <Route path="/movie/:id" exact element={<Movie />} />}
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

const App = () => {

  return (
    <div className="App">
      <Navbar companyName="cube movies" showSearch={window.location.pathname !== 'add-movie' ? true : false}/>
      <RoutesComp />
      <Footer />
    </div>
  );
};

export default App;
