import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App";

// Build-time prerender (scripts/prerender.mjs): the page arrives as real HTML, then React hydrates it.
export function render() {
  return renderToString(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
