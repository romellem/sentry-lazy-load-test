import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App, { SENTRY_CAUGHT_ERROR_EVENT_TYPE } from "./App";
import triggerCustomEvent from "./util/trigger-custom-event";
import reportWebVitals from "./reportWebVitals";

if (process.env.NODE_ENV === "production") {
  const captureError = async (error) => {
    try {
      console.error(error);
      const Sentry = await import(
        /* webpackChunkName: "SentryBrowser" */ "@sentry/browser"
      );
      Sentry.init({
        dsn: process.env.REACT_APP_SENTRY_DSN,
      });
      Sentry.captureException(error);
    } catch (e) {
      // all fails, reset window.onerror to prevent infinite loop on window.onerror
      console.error("Logging to Sentry failed", e);
      window.onerror = null;
    } finally {
      triggerCustomEvent(document, SENTRY_CAUGHT_ERROR_EVENT_TYPE);
    }
  };
  window.onerror = (message, url, line, column, error) => captureError(error);
  window.onunhandledrejection = (event) => captureError(event.reason);
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// This should throw
// eslint-disable-next-line
// myUndefinedFunction();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
