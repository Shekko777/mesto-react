import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
/* Использовал hash router потому что github не видит browser router */
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
reportWebVitals();
