import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import {createRoot} from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter >
    <App />
  </BrowserRouter>
);

serviceWorkerRegistration.unregister();

reportWebVitals();
