import React from 'react';
import ReactDOM from 'react-dom';
import App from "./views/App";
import {BrowserRouter} from "react-router-dom";
import IndexRouter from "./router/indexRouter";
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <App>
      <IndexRouter/>
    </App>
  </BrowserRouter>,
  document.getElementById('root')
);
