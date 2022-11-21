import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import App from "./App";
import 'bootstrap/dist/css/bootstrap.css';
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
    <Provider store={store}>
        <HashRouter basename="/" hashType='slash'>
            <App />
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);
