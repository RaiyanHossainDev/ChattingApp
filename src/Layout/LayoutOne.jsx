import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import UserProfile from '../Components/UserProfile/UserProfile'

const LayoutOne = () => {
  const currentUser = useSelector(sate => sate.currentUser.value)
  const nami = useNavigate()

  useEffect(()=>{
    if (currentUser == null) {
      nami('/auth/login')
    }
  },[])

  return (
    <div className='flex'>
        <UserProfile/>
        <div className=''>
          <Outlet/>
        </div>
    </div>
  )
}

export default LayoutOne