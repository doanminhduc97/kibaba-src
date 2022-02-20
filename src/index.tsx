import "@elastic/charts/dist/theme_light.css";
import { EuiProvider } from "@elastic/eui";
import '@elastic/eui/dist/eui_theme_light.min.css';
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <EuiProvider>
      <Router>
        <App />
      </Router>
    </EuiProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
