import React from 'react'
import ReactDOM from 'react-dom/client'

import { PlasmicRootProvider } from '@plasmicapp/react-web'

import { NavigationBar } from './components/NavigationBar'
import Homepage from './components/Homepage'

const customComponents = {
  render: {
    homePage: (targetDivId: string) => {
      ReactDOM.createRoot(document.getElementById(targetDivId)!).render(
        <React.StrictMode>
          <PlasmicRootProvider>
            <Homepage />
          </ PlasmicRootProvider>
        </React.StrictMode>,
      )
    },
    navigationBar: (targetDivId: string) => {
      ReactDOM.createRoot(document.getElementById(targetDivId)!).render(
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

