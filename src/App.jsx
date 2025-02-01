import { createBrowserRouter, createRoutesFromChildren, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Register from './Components/Register/Register'
import LayoutAuth from './Layout/LayoutAuth'
import app from './firebase.config'
import { ToastContainer } from 'react-toastify'
import Login from './Components/Login/Login'
import LayoutOne from './Layout/LayoutOne'
import Home from './Pages/Home'
import ForgetPass from './Components/ForgetPass/ForgetPass'
import FriendPage from './Pages/FriendPage'
import UserPage from './Pages/UserPage'
import RequestPage from './Pages/RequestPage'
import SentPage from './Pages/SentPage'
import BlockPage from './Pages/blockPage'

function App() {
  const router = createBrowserRouter(createRoutesFromChildren(
    <Route>
      <Route path='/auth' element={<LayoutAuth/>}>
        <Route index element={<Register/>} />
        <Route path='/auth/login' element={<Login/>} />
        <Route path='/auth/forget' element={<ForgetPass/>} />
      </Route>
      <Route path='/' element={<LayoutOne/>}>
        <Route index element={<Home/>} />
        <Route path='/friends' element={<FriendPage/>} />
        <Route path='/user' element={<UserPage/>} />
        <Route path='/request' element={<RequestPage/>} />
        <Route path='/sent' element={<SentPage/>} />
        <Route path='/BlockList' element={<BlockPage/>} />
      </Route>
    </Route>
  ))
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default App
