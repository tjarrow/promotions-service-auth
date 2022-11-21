import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import App from "./App";
import 'bootstrap/dist/css/bootstrap.css';
import {HashRouter} from "react-router-dom";

ReactDOM.render(
    <HashRouter basename="/" hashType='slash'>
        <App />
    </HashRouter>,
    document.getElementById('root')
);
