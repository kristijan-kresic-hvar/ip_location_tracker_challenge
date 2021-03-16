import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DataLayer } from './DataLayer'
import reducer, { initialState } from './reducer'

// Use sentry logger if dns is provided from the .env file
if(process.env.REACT_APP_SENTRY_DNS) {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DNS,
    integrations: [new Integrations.BrowserTracing()],
  
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

ReactDOM.render(
  <React.StrictMode>
    <DataLayer initialState={initialState} reducer={reducer}>
      <App />
    </DataLayer>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
