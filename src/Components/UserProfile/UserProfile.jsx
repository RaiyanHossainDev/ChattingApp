import React from 'react'
import './UserProfile.css'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../Navbar/Navbar'
import { IoIosLogOut } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { userData } from '../../slice/userSlice'

const UserProfile = () => {
    const currentUser = useSelector(state => state.currentUser.value)
    const nami = useNavigate()
    const dispatch = useDispatch()

    let handleLogout = ()=>{
        localStorage.removeItem('user')
        dispatch(userData(null))
        nami('/auth/login')
    }
  return (
    <section id='profile'>
        <div className="holder">
            <div className="searchBar">
                <input type="text" placeholder='Find a friend' />
            </div>
        </div>
        <div className="holder2">
        <Navbar/>
        <div className="line"></div>
        <div className="mainProfile">
            <img src={currentUser?.photoURL} alt="profilePic" />
            <h2>{currentUser?.displayName}</h2>
            <div className="logOut">
                <IoIosLogOut onClick={()=>handleLogout()} />
            </div>
        </div>
        </div>
    </section>
  )
}
export default UserProfile