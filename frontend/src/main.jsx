import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import TraceProvider from "./tracing.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TraceProvider>
      <App />
    </TraceProvider>
  </React.StrictMode>
);
