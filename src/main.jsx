import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./mediaqueries.css";
import ReactGA4 from "react-ga4";

ReactGA4.initialize("G-LKH5WPP3C0");
ReactGA4.send({
  hitType: "pageview",
  page: window.location.pathname,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
