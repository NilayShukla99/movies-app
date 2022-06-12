import types from '../actions/index';

const { IS_AUTHENTICATED, GET_MOVIE, ADD_MOVIE, UPDATE_MOVIE, GET_MOVIES, REMOVE_MOVIE, SAVE_MOVIES_LIST_ARR, SET_FILTERED_DATA, IS_USER } = types;

const initialState = {
  moviesListPromise: [],
  moviesListArr: [],
  filteredMoviesListArr: [],
  searchTerm: '',
  movie: null,
  submitted: false,
  authenticated: false,
  user: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_MOVIE:
      return {
        ...state,
        submitted: true,
        movie: action.payload,
      };
    case UPDATE_MOVIE:
      return {
        ...state,
        submitted: true,
        movie: action.payload,
      };
    case GET_MOVIE:
      return {
        ...state,
        movie: action.payload,
      };
    case GET_MOVIES:
      // console.log('get_movies', action.payload) // getting promise here
      return {
        ...state,
        moviesListPromise: action.payload,
      };
    case REMOVE_MOVIE:
      return {
        ...state,
        moviesListPromise: action.payload,
      };
    case SAVE_MOVIES_LIST_ARR:
      return {
        ...state,
        moviesListArr: action.payload,
      };
    case SET_FILTERED_DATA:
      return {
        ...state,
        filteredMoviesListArr: action.payload.arr,
        searchTerm: action.payload.searchTerm,
      };
      case IS_AUTHENTICATED:
        return {
          ...state,
          authenticated: action.payload
        };
      case IS_USER:
        return {
          ...state,
          user: action.payload
        };

    default:
      return initialState;
  }
};
