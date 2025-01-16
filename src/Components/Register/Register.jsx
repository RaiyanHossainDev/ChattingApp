import React from 'react'
import './Register.css'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <section id='register'>
        <div className="container cont">
            <div className="register">
                <div className="mainLogin">
                    <div className="loginHead">
                        <h2>Get Started</h2>
                        <p>Already have an Account ? <Link>Log in</Link></p>
                    </div>
                    <div className='pl-[67px] pr-[115px]'>
                        <form action="">
                            <div className="user">
                                <div className="userBox">
                                    <label htmlFor="">Name</label>
                                    <input type="text" />
                                </div>
                                <div className="userBox">
                                    <label htmlFor="">Email</label>
                                    <input type="email" />
                                </div>
                                <div className="userBox">
                                    <label htmlFor="">Password</label>
                                    <input type="password" />
                                </div>
                            </div>
                            <button>Sign Up</button>
                        </form>
                        <div className="or"><h2><span>Or Sign Up with </span></h2></div>
                        <div className="otherMethod">
                            <img src="images/google.png" alt="" />
                            <img src="images/apple.png" alt="" />
                        </div>
                    </div>
                    <img className='position' src="images/regleaf.png" alt="" />
                </div>
            </div>
        </div>
    </section>
  )
}

export default Register