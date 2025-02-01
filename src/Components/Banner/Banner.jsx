import React from 'react'
import './Banner.css'

const Banner = () => {
  return (
    <section id='banner'>
        <div className="container">
            <div className="banner_head">
                <h1>Your are not alone anymore. <span> Make your friends and have joy</span></h1>
                <p>made by Raiyan Hossain</p>
            </div>
            <div className="banner_row">
                <button>FIND <img src="/images/arrow.jpg" alt="" /></button>
            </div>
        </div>    
    </section>
  )
}

export default Banner