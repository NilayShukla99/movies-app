import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const useAuth = () => {
    // let authenticated = useSelector(({_movie}) => _movie.authenticated);
    let store = useSelector(store => store._movie);
    const user = store.user ? store.user : window.localStorage.getItem('gotrue.user');
    // let authenticated = store.authenticated ? window.sessionStorage.getItem('isLoggedIn') : store.authenticated ;
    let authenticated = store.authenticated || Boolean(user);

    if (authenticated) return true;
    return false;
}

const PrivateRoutes = (props) => {
    const auth = useAuth() || true;
   return auth ? props.children : <Navigate to="/" replace />
  };
  // outlet represents props.children
  export default PrivateRoutes;