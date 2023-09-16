import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";

createRoot(document.getElementById('root')).render(
    <Router>
    <CurrentUserProvider>
        <App />
      </CurrentUserProvider>
    </Router>
);

reportWebVitals();