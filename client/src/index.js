import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";

// 2nd argument is most relevant when we want to take care of server side rendering and stuff
// for us we dont care about setting some type of initial state
const store = createStore(reducers, {}, applyMiddleware());

ReactDOM.render(
    <Provider store={store}>

        <App />
    </Provider>,
    document.querySelector('#root')
);