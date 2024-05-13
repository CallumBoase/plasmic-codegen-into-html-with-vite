import React from 'react'
import ReactDOM from 'react-dom/client'
import { PlasmicCanvasHost, registerComponent } from "@plasmicapp/react-web/lib/host";

import { Hello } from './components/codeComponents/Hello';
import { helloMeta } from './components/codeComponents/Hello/registerComponentMeta';

registerComponent(Hello, helloMeta);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PlasmicCanvasHost />
  </React.StrictMode>
);
