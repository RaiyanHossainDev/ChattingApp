import React from 'react'
import './Head.css'
import { IoHome } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const Head = () => {
    const path = window.location.pathname

  return (
    <header>
        <div className="head_row">
            <Link to={'/'} className="items pr-[30px] border-r-[2px] border-r-gray-400">
                <IoHome /> Home
            </Link>
            {
                path == '/profile'&&
                <Link className='items'>
                    Profile
                </Link>
            }
        </div>
    </header>
  )
}

export default Head