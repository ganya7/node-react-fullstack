import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import App from "./components/App";
import reducers from "./reducers";
import reduxThunk from "redux-thunk";

// development only axios helpers
import axios from "axios";
window.axios = axios;

// 2nd argument is most relevant when we want to take care of server side rendering and stuff
// for us we dont care about setting some type of initial state
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}>

        <App />
    </Provider>,
    document.querySelector('#root')
);

// console.log('stripe: ', process.env.REACT_APP_STRIPE_KEY);
// console.log('ENV: ', process.env.NODE_ENV);