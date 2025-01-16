import { createBrowserRouter, createRoutesFromChildren, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Register from './Components/Register/Register'
import LayoutAuth from './Layout/LayoutAuth'

function App() {
  const router = createBrowserRouter(createRoutesFromChildren(
    <Route path='/' element={<LayoutAuth/>}>
      <Route index element={<Register/>} />
    </Route>
  ))

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
