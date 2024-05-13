import React from 'react'
import ReactDOM from 'react-dom/client'
import { PlasmicCanvasHost } from "@plasmicapp/react-web/lib/host";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PlasmicCanvasHost />
  </React.StrictMode>
);
