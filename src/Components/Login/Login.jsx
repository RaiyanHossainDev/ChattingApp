import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword , } from "firebase/auth";
import { Bounce, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { userData } from '../../slice/userSlice';

const Login = () => {
    // =========================== custom useStates
    const [input,setInput] = useState({email:'',password:''})
    const [error,setError] = useState({emailError:false,passwordError:false})
    const navigate   = useNavigate()
    const delivaryMan = useDispatch()

    // ============== Firebase variables
    const auth = getAuth();

    

    // =============================== All Functions
    let handleSubmit = (e)=>{
            // ===== preventing reload
            e.preventDefault()
            // ========================== validating
            if(input.email == ''){
                setError((prev)=>({...prev,emailError:true}))
            }else if(input.password == ''){
                setError((prev)=>({...prev,passwordError:true}))
            }else{
                // ============================ signing in the user
                signInWithEmailAndPassword(auth, input.email, input.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    if (user.emailVerified == true) {
                        localStorage.setItem('user',JSON.stringify(user))
                        delivaryMan(userData(user))
                        navigate('/')
                    }else{
                        toast.info('Email is not varified!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                            transition: Bounce,
                        });
                    }
                })
                .catch((error) => {
                    const errorCode = error.code
                    if (errorCode) {
                        toast.error('Something went wrong', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                            transition: Bounce,
                        });
                    }
                });
            }
        }

  return (
    <section id='login'>
        <div className="container cont">
            <div className="login">
                <div className="mainLogin">
                    <div className="loginHead">
                        <h2>Welcome Back</h2>
                        <p>Don't have any account ? <Link to={'/auth/'}>Register</Link></p>
                    </div>
                    <div className='pl-[67px] pr-[115px]'>
                        <form action="">
                            <div className="user">
                                <div className="userBox">
                                    {/* ============== email ============= */}
                                    <label htmlFor="">Email</label>
                                    <input className={`${error.emailError?'border-b-red-600':'border-b-white'}`} onChange={(e)=>{setInput((prev)=>({...prev,email:e.target.value})),setError((prev)=>({...prev,emailError:false}))}} type="email" />
                                </div>
                                <div className="userBox">
                                    {/* =============== password =========== */}
                                    <label htmlFor="">Password</label>
                                    <input className={`${error.passwordError?'border-b-red-600':'border-b-white'}`} onChange={(e)=>{setInput((prev)=>({...prev,password:e.target.value})),setError((prev)=>({...prev,passwordError:false}))}} type="password" />
                                </div>
                            </div>
                            <button onClick={(e)=>handleSubmit(e)}>Sign In</button>
                        </form>
                        <div className="or"><h2><span>Or Sign In with </span></h2></div>
                        <div className="otherMethod">
                            <a href="#">
                                <img src="/images/google.png" alt="" />
                            </a>
                            <a href="#">
                                <img src="/images/apple.png" alt="" />
                            </a>
                        </div>
                    </div>
                    <img className='position' src="/images/regleaf.png" alt="" />
                </div>
            </div>
        </div>
    </section>
  )
}

export default Login