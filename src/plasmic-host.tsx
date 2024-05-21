//This page will be served as localhost:5137/plasmic-host when you run your dev server
//This allows you to define code components for use in Plasmic studio like normally done in Codegen with Plasmic

import React from 'react'
import ReactDOM from 'react-dom/client'
import { PlasmicCanvasHost, registerComponent } from "@plasmicapp/react-web/lib/host";

//Import your custom components
import { HelloWorld } from './components/codeComponents/HelloWorld';
import { helloWorldMeta } from './components/codeComponents/HelloWorld/registerComponentMeta';

//Register your custom components for Plasmic studio
registerComponent(HelloWorld, helloWorldMeta);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PlasmicCanvasHost />
  </React.StrictMode>
);