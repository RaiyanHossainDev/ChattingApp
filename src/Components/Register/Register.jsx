import React, { useState } from 'react'
import './Register.css'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { Bounce, toast } from 'react-toastify';


const Register = () => {
    // =========================== custom useStates
    const [input,setInput] = useState({email:'',password:'',username:''})
    const [error,setError] = useState({emailError:false,passwordError:false,usernameError:false})
    const navigate = useNavigate()

    // ============== Firebase variables
    const auth = getAuth();


    // ============= All Function
    let handleSubmit = (e)=>{
        // ===== preventing reload
        e.preventDefault()
        // ========================== validating
        if (input.username == '') {
            setError((prev)=>({...prev,usernameError:true}))
        }else if(input.email == ''){
            setError((prev)=>({...prev,emailError:true}))
        }else if(input.password == ''){
            setError((prev)=>({...prev,passwordError:true}))
        }else{
            // ======================== creating a password base accout
            createUserWithEmailAndPassword(auth, input.email, input.password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                // ================ updating user's profile
                updateProfile(auth.currentUser, {
                    displayName: input.username, photoURL: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                  }).then(() => {
                    // Profile updated!
                    // ======================= sending a verification mail
                    sendEmailVerification(auth.currentUser)
                    .then(() => {
                        // Email verification sent!
                        toast.success('Email verification sent', {
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
                        navigate('/auth/login')
                    });
                  }).catch((error) => {
                    // An error occurred
                    
                  });
            })
            .catch((error) => {
                // ===================== tarmane problem ase
                const errorCode = error.code;
                if (errorCode === 'auth/email-already-in-use') {
                    toast.error('This email is already in use', {
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
                if (errorCode === 'auth/weak-password') {
                    toast.info('Password to weak', {
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
                if (errorCode === 'auth/invalid-email') {
                    toast.info('Invalid Email', {
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
    <section id='register'>
        <div className="container cont">
            <div className="register">
                <div className="mainRegister">
                    <div className="RegisterHead">
                        <h2>Get Started</h2>
                        <p>Already have an Account ? <Link to={'/auth/login'}>Log in</Link></p>
                    </div>
                    <div className='pl-[67px] pr-[115px]'>
                        <form action="">
                            <div className="user">
                                <div className={`userBox`}>
                                    {/* =============== username ========= */}
                                    <label htmlFor="">Name</label>
                                    <input className={`${error.usernameError?'border-b-red-600':'border-b-white'}`} onChange={(e)=>{setInput((prev)=>({...prev,username:e.target.value})),setError((prev)=>({...prev,usernameError:false}))}} type="text" />
                                </div>
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
                            <button onClick={(e)=>handleSubmit(e)}>Sign Up</button>
                        </form>
                        <div className="or"><h2><span>Or Sign Up with </span></h2></div>
                        <div className="otherMethod">
                            <a href='#'>
                                <img src="/images/google.png" alt="" />
                            </a>
                            <a href='#'>
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

export default Register