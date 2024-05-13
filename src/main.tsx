import React from 'react'
import ReactDOM from 'react-dom/client'
// import './index.css'

import { NavigationBar } from './components/NavigationBar'



const customComponents = {
  render: {
    navigationBar: (targetDivId: string) => {
      ReactDOM.createRoot(document.getElementById(targetDivId)!).render(
        <React.StrictMode>
          <NavigationBar />
        </React.StrictMode>,
      )
    }
  }
}

export default customComponents

// ReactDOM.createRoot(domNode!).render(
//   <React.StrictMode>
//     <NavigationBar />
//   </React.StrictMode>,
// )
