import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { MusicContextProvider } from "./Context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <MusicContextProvider>
    <App />
  </MusicContextProvider>
);
