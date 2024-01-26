import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Index from './Components/Index.jsx'
import { BrowserRouter, createBrowserRouter, Route,createRoutesFromElements, RouterProvider } from 'react-router-dom'
import LandingPage from './screens/LandingPage.jsx'
// // const router = createBrowserRouter(
// //   createRoutesFromElements(
// //       <Route path="/" element={<App/>}>
// //       <Route path="" element={<LandingPage/>}/> 
// //       <Route path="/notes" element={<Index/>}/> 

// //       </Route>
// //     )
// )
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <App/>
  </BrowserRouter>
  )
