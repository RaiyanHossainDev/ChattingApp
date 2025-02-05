import React from 'react'
import './Head.css'
import { IoHome } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const Head = () => {
    const path = window.location.pathname

  return (
    <header>
        <div className="head_row flex gap-2">
            <Link to={'/'} className="items pr-[30px] border-r-[2px] border-r-gray-400">
                <IoHome /> Home
            </Link>
            {
                path == '/user'&&
                <Link to={'/user'} className='items'>
                    Users
                </Link>
            }
            {
                path == '/friends'&&
                <>
                    <Link to={'/user'} className='items'>
                        Users
                    </Link>
                    <Link className="items">
                        |
                    </Link>
                    <Link to={'/friends'} className='items'>
                        Friends
                    </Link>
                </>
            }
            {
                path == '/request'&&
                <>
                    <Link to={'/user'} className='items'>
                        Users
                    </Link>
                    <Link className="items">
                        |
                    </Link>
                    <Link to={'/request'} className='items'>
                        Requests
                    </Link>
                </>
            }
            {
                path == '/sent'&&
                <>
                    <Link to={'/user'} className='items'>
                        Users
                    </Link>
                    <Link className="items">
                        |
                    </Link>
                    <Link to={'/sent'} className='items'>
                        Sent
                    </Link>
                </>
            }
            {
                path == '/BlockList'&&
                <>
                    <Link to={'/user'} className='items'>
                        Users
                    </Link>
                    <Link className="items">
                        |
                    </Link>
                    <Link to={'/BlockList'} className='items'>
                        Blocks
                    </Link>
                </>
            }
            {
                path == '/messege'&&
                <>
                    <Link to={'/user'} className='items'>
                        Users
                    </Link>
                    <Link className="items">
                        |
                    </Link>
                    <Link to={'/messege'} className='items'>
                        Messege
                    </Link>
                </>
            }
        </div>
    </header>
  )
}

export default Head