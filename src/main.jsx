import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import PlanosTreino from "./PlanosTreino.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PlanosTreino />
  </StrictMode>
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // The app should keep working even when the browser blocks service workers.
    });
  });
}
