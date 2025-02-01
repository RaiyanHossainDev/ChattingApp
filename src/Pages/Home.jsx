import React from 'react'
import { useSelector } from 'react-redux'
import Banner from '../Components/Banner/Banner'

const Home = () => {
  const data = useSelector(a => a.currentUser.value)

  return (
    <div className='w-full'>
      <Banner/>
    </div>
  )
}

export default Home