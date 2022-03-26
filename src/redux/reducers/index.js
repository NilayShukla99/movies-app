import { combineReducers } from "redux";
import addMovieReducer from "./addMovieReducer";

const rootReducer = combineReducers({
    _movie: addMovieReducer,
});

export default rootReducer;