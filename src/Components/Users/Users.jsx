import React, { useEffect, useState } from 'react'
import './Users.css'
import { BiSearch } from 'react-icons/bi'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';


const Users = () => {
    // custom variables
    const [allUsers , setAllUsers] = useState([])
    const [mainUsers,setMainUsers] = useState([])
    const [request,setRequests] = useState([])
    const [requestData,setRequestData] = useState([])
    const [toMe,setToMe] = useState([])
    const [AllFriends,setAllFriends] = useState([])
    const [searchTerm,setSearchTerm] = useState('')


    // =-=-=-=-=-==-=-=-=-=-=-=- Redux variables
    const currentUser = useSelector(a => a.currentUser.value)

    // ================== reading data
    const db = getDatabase()
    useEffect(()=>{
        onValue(ref(db, '/AllUsers'), (snapshot) => {
            let arr = []
            snapshot.forEach((item)=>{
                if (item.key != currentUser.uid) {
                    arr.push(item.val())
                }
            })
            setAllUsers(arr)
            setMainUsers(arr)
        });
    },[])
    // =-=-=-=-=-

    useEffect(() => {
        onValue(ref(db, '/Requests'), (snapshot) => {
          let array = []
          let array2 = []
          snapshot.forEach((item) => {
            if (item.val().senderUid == currentUser.uid) {
                array.push([item.val().toUid,item.key])
            }
            if (item.val().toUid == currentUser.uid) {
                array2.push(item.val().senderUid)
            }
          })
          setRequests(array)
          setToMe(array2)
        })
      }, [])
    // -=-=-=-=-=-=-=-
      useEffect(()=>{
        onValue(ref(db, '/Friends'), (snapshot) => {
            let arr = []
            snapshot.forEach((item)=>{
                if (item.val().currentFriendId ==  currentUser.uid) {
                    arr.push({...item.val(),key:item.key,isFriend:"me"})
                }else if (item.val().toFriendId == currentUser.uid) {
                    arr.push({...item.val(),key:item.key,isFriend:'he'})
                }
            })
            setAllFriends(arr)
        });
      },[])

    // =================================== All Functions
    // =--=-=-=-=-==-=--=-=- search function
    let handleSearch = ()=>{
        const filterdUser = mainUsers.filter((item)=>{
            if (searchTerm == '') {
                return mainUsers
            }else{
                return item.username.toLocaleLowerCase() == searchTerm.toLocaleLowerCase()
            }
        })
        setAllUsers(filterdUser)
    }

    // =-=-=-=-=-=-=-=-=-=-= addFriend Function
    let handleAddFriend = (data)=>{
        set(push(ref(db, '/Requests'), {
            toUid: data.uid,
            username: currentUser.displayName,
            profile_picture : currentUser.photoURL,
            senderUid: currentUser.uid,
        }));
    }
    // =-=-=-=-=-=-=-=-=-=-= cancel function
    let handleCancel = (uid)=>{
        const index = request.findIndex(arr => arr.includes(uid))
        const key = request[index][1]
        remove(ref(db, "/Requests/" + key))
        
    }

    console.log(AllFriends);
    
  return (
    <section id='users'>
        <div className="searchBar">
            <input onKeyDown={(e)=>{e.key === "Enter"&&handleSearch(); handleSearch()}} onChange={(e)=>{setSearchTerm(e.target.value)}} type="text" />
            <button onClick={()=>handleSearch()}>Find<BiSearch/></button>
        </div>
        <div className="Users">
        
            {
                allUsers.length < 1?
                <div className="notFound flex flex-col justify-center items-center gap-10">
                    <div className="w-32 aspect-square rounded-full relative flex justify-center items-center animate-[spin_3s_linear_infinite] z-40 bg-[conic-gradient(white_0deg,white_300deg,transparent_270deg,transparent_360deg)] before:animate-[spin_2s_linear_infinite] before:absolute before:w-[60%] before:aspect-square before:rounded-full before:z-[80] before:bg-[conic-gradient(white_0deg,white_270deg,transparent_180deg,transparent_360deg)] after:absolute after:w-3/4 after:aspect-square after:rounded-full after:z-[60] after:animate-[spin_3s_linear_infinite] after:bg-[conic-gradient(#065f46_0deg,#065f46_180deg,transparent_180deg,transparent_360deg)]">
                    v    <span className="absolute w-[85%] aspect-square rounded-full z-[60] animate-[spin_5s_linear_infinite] bg-[conic-gradient(#34d399_0deg,#34d399_180deg,transparent_180deg,transparent_360deg)]">
                        </span>
                    </div>
                    <h2 className={'text-2xl font-bold text-brand'}>This is user is not Found</h2>
                </div>
                :
                allUsers.map((item)=>(
                    <div key={item.uid} className="w-[200px] h-[240px] bg-brand p-3 flex flex-col gap-1 rounded-br-3xl">
                        <div className="flex justify-center items-center duration-500 contrast-50 h-48 bg-gradient-to-bl from-black via-orange-900 to-indigo-600  hover:contrast-100">
                            <img className='w-[80px] h-[80px] rounded-full' src={item.profile_picture} alt="" />
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-row justify-between">
                                <div className="flex flex-col">
                                    <span className="text-lg text-gray-50 font-bold">{item.username}</span>
                                </div>
                            </div>
                        {
                            toMe.includes(item.uid)?
                                <button className="hover:bg-sky-700 text-gray-50 bg-sky-800 py-2 rounded-br-xl">Accept</button>
                            :
                                request.some(arr => arr.includes(item.uid))?
                                <button onClick={()=>handleCancel(item.uid)} className="hover:bg-sky-700 text-gray-50 bg-sky-800 py-2 rounded-br-xl">Cancel</button>
                                :
                                <button onClick={()=>handleAddFriend(item)} className="hover:bg-sky-700 text-gray-50 bg-sky-800 py-2 rounded-br-xl">Add Friend</button>
                        }
                        </div>
                    </div>
                ))
            }
        </div>
    </section>
  )
}

export default Users