// import './App.css';
// import './index.css';
import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import netlifyIdentity from 'netlify-identity-widget';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RoutesComp from './routes';

netlifyIdentity.init();
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
