import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  const data = useSelector(a => a.currentUser.value)
  return (
    <>
      
    </>
  )
}

export default Home