import React from 'react';
import ReactDOM, {createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { configureStore } from "./store";
import { initContract } from './near-api'
const reactRoot = createRoot(document.querySelector('#root'));
//
window.nearInitPromise = initContract()
  .then(() => {
reactRoot.render(
  <Provider store={configureStore({})}>
    <React.Fragment>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <App />
      </BrowserRouter>
    </React.Fragment>
  </Provider>
);
})
.catch(e => {
  reactRoot.render(<div style={{color: 'red'}}>Error: <code>{e.message}</code></div>);
  console.error(e);
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(//console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
