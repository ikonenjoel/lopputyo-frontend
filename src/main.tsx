import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

// rekisteröi moduulit jotta niitä voi käyttää.
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
