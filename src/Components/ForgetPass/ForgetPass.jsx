import React, { useState } from 'react'
import './ForgetPass.css'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Bounce, toast } from 'react-toastify';


const ForgetPass = () => {
    const [email,setEmail] = useState({email:'',emailError:false})
    const nami   = useNavigate()
    const auth = getAuth();

    let handleSendPasswordResetEmail = (w)=>{
        w.preventDefault()
        if (email.email == '') {
            setEmail((prev)=>({...prev,emailError:true}))
        }else{
            sendPasswordResetEmail(auth, email.email)
            .then(() => {
                toast.success('Email Sent!', {
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
                nami('/auth/login')
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);
                if (errorCode === 'auth/invalid-email') {
                    toast.error('Invalid Email', {
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
    <section id='forget'>
        <div className="mainForget">
            <form action="">
                <input onChange={(e)=>{setEmail((prev)=>({...prev,email:e.target.value})),setEmail((prev)=>({...prev,emailError:false}))}} className={email.emailError?'border-b-[2px] border-b-[#ff561e]':'border-b-[2px] border-b-transparent'} type="email" placeholder='Enter your Email' />
                <button onClick={(e)=>handleSendPasswordResetEmail(e)}>send password reset Email</button>
            </form>
            <Link to={'/auth/login'}>Remember the password?</Link>
        </div>
    </section>
  )
}

export default ForgetPass