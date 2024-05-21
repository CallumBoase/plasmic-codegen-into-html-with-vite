// The main entry point for custom components to get bundled for use in HTML
// register your custom components in customComponents.render object

//React
import React from 'react'
import ReactDOM from 'react-dom/client'

//Plasmic
import { PlasmicRootProvider } from '@plasmicapp/react-web'

//Utils
import { getRenderTarget } from './utils/getRenderTarget'

//Import your components
//import Homepage from './components/Homepage' //Example of importing a Plasmic component once synced
import { HelloWorld } from './components/codeComponents/HelloWorld'; // Example import of non-plasmic component directly

//Extend the window object to allow for adding window.customComponents
declare global {
  interface Window {
    customComponents: typeof customComponents
  }
}
//--------------------------------------------------------------------------------------------
// Register your custom components for use in HTML here
//--------------------------------------------------------------------------------------------
const customComponents = {
  render: {

    //Register a plasmic component or page here
    //Rename plasmicComponentOrPage to whatever you want to call it
    plasmicComponentOrPage: (options : { targetDivId: string, useShadowDom: boolean }) => {

      const renderTarget = getRenderTarget(options.targetDivId, options.useShadowDom);

      ReactDOM.createRoot(renderTarget).render(
        <React.StrictMode>
          <PlasmicRootProvider>
            {/* <Homepage /> //Your plasmic component or page would go here */}
          </ PlasmicRootProvider>
        </React.StrictMode>,
      )
    },

    //Register a non-plasmic component here directly if needed
    //Rename nonPlasmicComponent to whatever you want to call it
    nonPlasmicComponent: (options: {targetDivId: string, useShadowDom: boolean}) => {

      const renderTarget = getRenderTarget(options.targetDivId, options.useShadowDom);

      ReactDOM.createRoot(renderTarget).render(
        <React.StrictMode>
          <HelloWorld whoToGreet='Peter' />
        </React.StrictMode>,
      )
    }
  }
}

//Add customComponents to the window object
window.customComponents = customComponents;
