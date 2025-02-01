import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword ,signInWithPopup,GoogleAuthProvider, getRedirectResult } from "firebase/auth";
import { Bounce, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { userData } from '../../slice/userSlice';
import { BeatLoader } from 'react-spinners';
import { getDatabase, push, ref, set } from "firebase/database";



const Login = () => {
    // =========================== custom useStates
    const [input,setInput] = useState({email:'',password:''})
    const [error,setError] = useState({emailError:false,passwordError:false})
    const [loader,setLoader] = useState(false)
    const navigate   = useNavigate()
    const delivaryMan = useDispatch()

    // ============== Firebase variables
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const db = getDatabase();


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
                // ============================ setting loader
                setLoader(true)
                // ============================ signing in the user
                signInWithEmailAndPassword(auth, input.email, input.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // if (user.emailVerified == true) {
                        setLoader(false)
                        toast.success('loged in!', {
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
                        localStorage.setItem('user',JSON.stringify(user))
                        delivaryMan(userData(user))
                        navigate('/')
                        set(ref(db, 'AllUsers/' + user.uid), {
                            username: user.displayName,
                            profile_picture : user.photoURL,
                            uid: user.uid,
                        });
                    // }else{
                    //     setLoader(false)
                    //     toast.info('Email is not varified!', {
                    //         position: "top-right",
                    //         autoClose: 5000,
                    //         hideProgressBar: false,
                    //         closeOnClick: true,
                    //         pauseOnHover: true,
                    //         draggable: true,
                    //         progress: undefined,
                    //         theme: "dark",
                    //         transition: Bounce,
                    //     });
                    // }
                })
                .catch((error) => {
                    const errorCode = error.code
                    if (errorCode) {
                        setLoader(false)
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
        let handleGoogleLogin = ()=>{
            signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                localStorage.setItem('user',JSON.stringify(user))
                delivaryMan(userData(user))
                navigate('/')
                set(ref(db, 'AllUsers/' + user.uid), {
                    username: user.displayName,
                    email: user.email,
                    profile_picture : user.photoURL,
                    uid: user.uid,
                }
                );
                
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log(errorCode);
                console.log(credential);
                console.log(email);
            });
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
                            <button onClick={(e)=>handleSubmit(e)}>
                                {
                                    loader?
                                        <BeatLoader color='#ededed' />
                                    :
                                        "Sign In"
                                }   
                            </button>
                        </form>
                        <Link to={'/auth/forget'} className="forget inline-block mt-[15px] text-off">Forget Password ?</Link>
                        <div className="or"><h2><span>Or Sign In with </span></h2></div>
                        <div className="otherMethod">
                            <button onClick={handleGoogleLogin} href="#">
                                <img src="/images/google.png" alt="" />
                            </button>
                            <button href="#">
                                <img src="/images/apple.png" alt="" />
                            </button>
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