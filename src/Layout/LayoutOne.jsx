import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import UserProfile from '../Components/UserProfile/UserProfile'
import Head from '../Components/Head/Head'

const LayoutOne = () => {
  const currentUser = useSelector(sate => sate.currentUser.value)
  const currentCursor = useSelector(state => state.cursor.value)
  const nami = useNavigate()

  document.addEventListener('mousemove', (event) => {
    const cursor = document.getElementById('begun');
    const x = event.clientX; // Mouse X coordinate
    const y = event.clientY; // Mouse Y coordinate
    
    // Set the cursor's position
    cursor.style.transform = `translate(${x-14}px, ${y-15}px)`;

    const dot = document.getElementById('dot');
    const X = event.clientX; // Mouse X coordinate
    const Y = event.clientY; // Mouse Y coordinate
    
    // Set the cursor's position
    dot.style.transform = `translate(${x-3}px, ${y-3}px)`;
  });

  useEffect(()=>{
    if (currentUser == null) {
      nami('/auth/login')
    }
  },[])

  return (
    <div className='flex justify-stretch'>
        <UserProfile/>
        <div style={{flex:1, width:"100%",}}>
          <Head/>
          <div className='h-[856px] overflow-y-scroll'>
            <Outlet/>
          </div>
        </div>
        <div id="begun"></div>
        <div id="dot"></div>
    </div>
  )
}

export default LayoutOne