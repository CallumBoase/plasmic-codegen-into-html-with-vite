import React from 'react'
import ReactDOM from 'react-dom/client'

import { PlasmicRootProvider } from '@plasmicapp/react-web'

import { setupShadowDOM } from './utils/setupShadowDom'

import { NavigationBar } from './components/NavigationBar'
import Homepage from './components/Homepage'

function getRenderTarget(targetDivId: string, useShadowDom: boolean) {
  const targetElement = document.getElementById(targetDivId);
  if (!targetElement) throw new Error(`Element with id ${targetDivId} not found`);

  return useShadowDom ? setupShadowDOM(targetElement) : targetElement;
}

const customComponents = {
  render: {
    homePage: (options : { targetDivId: string, useShadowDom: boolean }) => {

      const renderTarget = getRenderTarget(options.targetDivId, options.useShadowDom);

      ReactDOM.createRoot(renderTarget).render(
        <React.StrictMode>
          <PlasmicRootProvider>
            <Homepage />
          </ PlasmicRootProvider>
        </React.StrictMode>,
      )
    },
    navigationBar: (options: {targetDivId: string, useShadowDom: boolean}) => {

      const renderTarget = getRenderTarget(options.targetDivId, options.useShadowDom);

      ReactDOM.createRoot(renderTarget).render(
        <React.StrictMode>
          <NavigationBar />
        </React.StrictMode>,
      )
    }
  }
}

declare global {
  interface Window {
    customComponents: typeof customComponents
  }
}

window.customComponents = customComponents;

export default customComponents;

