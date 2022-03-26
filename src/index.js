import React from 'react';
import ReactDOM from 'react-dom';
import '../src/index.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // cdn also added in index.html
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

// react-router
import { BrowserRouter } from 'react-router-dom';

// react-redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './redux/reducers';

// components
import App from './App';

// store - can create a separate file for this then export default
const store = createStore(
  rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
