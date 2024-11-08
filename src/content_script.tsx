import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";

console.log("entor");

// Check if the container already exists, if not, create and inject it
let appContainer = document.getElementById("aqsa");
if (!appContainer) {
  appContainer = document.createElement("div");
  appContainer.id = "aqsa";
  document.body.appendChild(appContainer);
}

const root = createRoot(appContainer); // createRoot(container!) if you use TypeScript
root.render(<App />);
