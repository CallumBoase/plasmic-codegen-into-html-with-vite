import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './index.css'

import { NavigationBar } from './components/NavigationBar'

// const domNode = document.getElementById('navigation')

declare global {
  interface Window {
    customComponents: {
      render: {
        navigationBar: (targetDivId: string) => void
      }
    }
  }
}

window.customComponents = {
  render: {
    navigationBar: (targetDivId) => {
      ReactDOM.createRoot(document.getElementById(targetDivId)!).render(
        <React.StrictMode>
          <NavigationBar />
        </React.StrictMode>,
      )
    }
  }
}

// ReactDOM.createRoot(domNode!).render(
//   <React.StrictMode>
//     <NavigationBar />
//   </React.StrictMode>,
// )
