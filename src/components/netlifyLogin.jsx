import React, { useEffect, useState } from "react";
import netlifyIdentity from 'netlify-identity-widget';
import { useNavigate, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { setUser as updateUser, checkAuth } from '../redux/actions'
// netlifyIdentity.init();

const NetlifyLogin = () => {

const navigate = useNavigate();
const [user, setUser] = useState(null);
const dispatch = useDispatch();
const store = useSelector(store => store._movie);

// netlifyIdentity.on('init', user => console.log('init', user));
netlifyIdentity.on('login', user => {
    if (user) {
        setUser(user);
        dispatch(updateUser(user));
        dispatch(checkAuth(Boolean(user)));
        netlifyIdentity.close();
    }
});
netlifyIdentity.on('logout', () => {
    setUser(null);
    dispatch(updateUser(null));
    dispatch(checkAuth(false));
});
// netlifyIdentity.on('error', err => console.error('Error', err));
// netlifyIdentity.on('open', () => console.log('Widget opened'));
// netlifyIdentity.on('close', () => console.log('Widget closed'));

useEffect(() => {
    if (user) {
        navigate('/home', { replace: true });
        console.log(store, 'user::');
    };
}, [user]);

const openModal = () => {
    netlifyIdentity.open();
}

    return (
        <input
            type="button" value={user ? 'Log out' : 'Log In'}
            style={{
                width: '50%',
                color: '#000',
                backgroundColor: '#ffaa3c',
                borderRadius: '5px',
                borderColor: 'cf872a8a',
                margin: 'auto',
                display: 'block'
            }}
            onClick={!user ? () => openModal() : () => netlifyIdentity.logout() }
        />
    );
};

export default NetlifyLogin;