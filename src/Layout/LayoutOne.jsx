import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar'

const LayoutOne = () => {
  const currentUser = useSelector(sate => sate.currentUser.value)
  const nami = useNavigate()

  useEffect(()=>{
    if (currentUser == null) {
      nami('/auth/login')
    }
  },[])

  return (
    <div>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default LayoutOne