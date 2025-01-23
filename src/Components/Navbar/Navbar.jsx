import React, { useState } from 'react'
import './Navbar.css'
import { BsLayoutSidebar, BsPeople, BsPersonFillCheck } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { TiMessages } from 'react-icons/ti'
import { IoPersonRemoveOutline } from 'react-icons/io5'
import { MdOutlinePersonAdd } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [nav,setNav] = useState(false)
  console.log(nav);

  return (
    <div className="holder">
      <nav id="nav">
        <div className="container">
          <div className={`menu_row ${nav?"w-[280px] rounded-[15px]"
          :
            "rounded-[50%] w-[50px] hover:rounded-[15px] hover:w-[55px]"}`}>
            <div className={`icons icon1 ${nav?'top-[50%] opacity-[10] translate-y-[-50%] left-[10px]'
            :
              ' opacity-0 top-[-20px] left-[40px]'}`}>
              <ul className={`${nav?'flex openUl':'hidden'}`}>
                <li><Link><CgProfile /></Link>
                  <span>Profile</span>
                </li>
                <li><Link><BsPeople /></Link>
                  <span>Friends</span>
                </li>
                <li><Link><TiMessages /></Link>
                  <span>Messages</span>
                </li>
              </ul>
            </div>
            <div className="main">
              <BsLayoutSidebar onClick={()=>setNav(!nav)} />
            </div>
            <div className={`icons icon2 ${nav?'top-[50%] opacity-[10] translate-y-[-50%] right-[10px]'
            :
              ' opacity-0 top-[-20px] right-[-40px]'}`}>
              <ul className={`${nav?'flex':'hidden'}`}>
                <li><Link><MdOutlinePersonAdd /></Link>
                  <span>Add</span>
                </li>
                <li><Link><BsPersonFillCheck /></Link>
                  <span>Requests</span>
                </li>
                <li><Link><IoPersonRemoveOutline /></Link>
                  <span>Block</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar