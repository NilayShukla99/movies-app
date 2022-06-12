import axios from 'axios';
// import api from '../../api/api'; // or directly use this [instead importing axios separately]

const baseUrl = 'https://movies-app-154a5-default-rtdb.firebaseio.com/moviesData';
const types = {
  ADD_MOVIE: 'ADD_MOVIE',
  UPDATE_MOVIE: 'UPDATE_MOVIE',
  GET_MOVIES: 'GET_MOVIES',
  GET_MOVIE: 'GET_MOVIE',
  REMOVE_MOVIE: 'REMOVE_MOVIE',
  SAVE_MOVIES_LIST_ARR: 'SAVE_MOVIES_LIST_ARR',
  SET_FILTERED_DATA: 'SET_FILTERED_DATA',
  IS_AUTHENTICATED: 'IS_AUTHENTICATED',
  IS_USER: 'IS_USER'
};

export const addMovie = entity => {
  const res = axios.post(`${baseUrl}.json`, entity);

  getMovies();
  return {
    type: types.ADD_MOVIE,
    payload: res,
  };
};

export const getMovie = id => {
  const res = axios.get(`${baseUrl}/${id}.json`);
  return {
    type: types.GET_MOVIE,
    payload: res,
  };
};

export const getMovies = () => {
  const res = axios.get(`${baseUrl}.json`);
  return {
    type: types.GET_MOVIES,
    payload: res,
  };
};

export const updateMovie = (firebaseID, id, entity) => {
  const res = axios.put(`${baseUrl}/${firebaseID}.json`, entity);

  getMovies();
  return {
    type: types.UPDATE_MOVIE,
    payload: res,
  };
};

export const deleteMovie = (firebaseID, id) => {
  const res = axios.delete(`${baseUrl}/${firebaseID}.json`);

  return {
    type: types.REMOVE_MOVIE,
    payload: res,
  };
};

export const saveMoviesListArr = arr => {
  return {
    type: types.SAVE_MOVIES_LIST_ARR,
    payload: arr,
  };
};

export const filteredMoviesListArr = (arr, searchTerm) => {
  return {
    type: types.SET_FILTERED_DATA,
    payload: { arr, searchTerm }
  };
};

export const checkAuth = authData => {
  return {
    type: types.IS_AUTHENTICATED,
    payload: authData
  };
};

export const setUser = user => {
  return {
    type: types.IS_USER,
    payload: user
  }
}

export default types;
