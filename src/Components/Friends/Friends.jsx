import React, { useEffect, useState } from 'react'
import './Friend.css'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';


const Friends = () => {
    // =-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-= custom variables
    const [AllFriends,setAllFriends] = useState([])

    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-= Redux variables
    const  currentUser = useSelector(a => a.currentUser.value)

    // -=-=-=-=-=-=-=-=-=-=-=-=-=- Reading Data
    const db = getDatabase()
    useEffect(()=>{
        onValue(ref(db, '/Friends'), (snapshot) => {
            let arr = []
            snapshot.forEach((item)=>{
                if (item.val().currentFriendId ==  currentUser.uid) {
                    arr.push({
                        friendUid: item.val().toFriendId,
                        friendName: item.val().toFriendName,
                        friendPicture: item.val().toFriendPicture,
                        key: item.key,
                    })
                }else if (item.val().toFriendId == currentUser.uid) {
                    arr.push({
                        friendUid: item.val().currentFriendId,
                        friendName: item.val().currentFriendName,
                        friendPicture: item.val().currentFriendPicture,
                        key: item.key,
                    })
                }
            })
            setAllFriends(arr)
        });
    },[])


    // -=-=--=--=-==--=-=-=-=-=-=-= functions
    // -=-=-=-=-==-=-= unfriend function
    let handleUnfriend = (item)=>{
        remove(ref(db,"/Friends/" + item.key))
    }
    // =-=-=-=--=-=-== Block Function
    let handleBlock = (data)=>{
        remove(ref(db,"/Friends/" + data.key))
        set(push(ref(db, '/BlockList'), {
            blockFriendUid: data.friendUid,
            blockFriendName: data.friendName,
            blockFriendPicture: data.friendPicture,
            currentUserUid: currentUser.uid,
        }));
    }



  return (
    <section id='friend'>
        <div className="friend_head">
            <h1>All Friends</h1>
        </div>
        <div className="friends mt-[70px] flex flex-wrap gap-[20px]">
        {
            AllFriends.map((item)=>(
                        <div key={item.key} className="singleFriendCard">
                            <div className="relative flex w-[250px] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                                <div className="relative flex justify-center items-center mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-green-500 to-green-600">
                                    <img width={'90px'} className=' rounded-full' src={item.friendPicture} alt="" />
                                </div>
                                <div className="p-6">
                                    <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                                        {item.friendName}
                                    </h5>
                                </div>
                                <div className="anotherButton flex justify-center mb-[10px]">
                                    <button data-ripple-light="true" type="button" className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                        Chat
                                    </button>
                                </div>
                                <div className="p-6 pt-0 flex justify-between">
                                    <button onClick={()=>{handleUnfriend(item)}} data-ripple-light="true" type="button" className="select-none rounded-lg bg-yellow-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-yellow-500/20 transition-all hover:shadow-lg hover:shadow-yellow-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                        UnFriend
                                    </button>
                                    <button onClick={()=>handleBlock(item)} data-ripple-light="true" type="button" className="select-none rounded-lg bg-red-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                        Block
                                    </button>
                                </div>
                            </div>
                        </div>
            ))
        }
        </div>
    </section>
  )
}

export default Friends