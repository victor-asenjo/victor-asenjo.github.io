import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "./styles.css";
import App from "./App";

const root = document.getElementById("root");
const tree = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// The build prerenders the page (scripts/prerender.mjs); hydrate it instead of re-creating it.
if (root.hasAttribute("data-prerendered")) ReactDOM.hydrateRoot(root, tree);
else ReactDOM.createRoot(root).render(tree);
