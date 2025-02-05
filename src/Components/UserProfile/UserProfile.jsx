import React, { useState } from 'react'
import './UserProfile.css'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../Navbar/Navbar'
import { IoIosLogOut } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { userData } from '../../slice/userSlice'
import { searchKey } from '../../slice/searchSlice'

const UserProfile = () => {
    const currentUser = useSelector(state => state.currentUser.value)
    const [searchData,setSearchData] = useState('')
    const nami = useNavigate()
    const dispatch = useDispatch()

    let handleLogout = ()=>{
        localStorage.removeItem('user')
        dispatch(userData(null))
        nami('/auth/login')
    }

    let handleSearch = (data)=>{
        if (data.key === "Enter") {
            dispatch(searchKey(searchData))
            nami('/user')
        }
    }
  return (
    <section id='profile'>
        <div className="holder">
            <div className="searchBar">
                <input onKeyDown={(e)=>handleSearch(e)} onChange={(e)=>setSearchData(e.target.value)} type="text" placeholder='Find a friend' />
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