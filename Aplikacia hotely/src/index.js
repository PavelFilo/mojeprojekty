import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import hotelItemsReducer from './store/reducers/hotelItems';
import authReducer from './store/reducers/auth';
import addHotelReducer from './store/reducers/addHotel';
import App from './App';
import * as serviceWorker from './serviceWorker';

const rootReducer = combineReducers({
    auth: authReducer,
    hotelItems: hotelItemsReducer,
    addHotel: addHotelReducer,
});

const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));


ReactDOM.render(
  <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
