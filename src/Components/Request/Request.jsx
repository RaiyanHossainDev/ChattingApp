import React, { useEffect, useState } from 'react'
import './Request.css'
import { useSelector } from 'react-redux'
import { getDatabase, ref, onValue, remove, set, push } from "firebase/database";


const Request = () => {
    // -=-=-=-=-=-=-=-= custom variables
    const [allRequests,setAllRequests] = useState([])

    // ===-=-=-=-===-=-=-=== Redux variables
    const currentUser = useSelector(state => state.currentUser.value)

    // ==================== Reading Data
    const db = getDatabase()
    useEffect(()=>{
        onValue(ref(db, '/Requests'), (snapshot) => {
            let arr = []
            snapshot.forEach((item)=>{
                if (item.val().toUid == currentUser.uid) {
                    arr.push({...item.val(),key:item.key})
                }
            })
            setAllRequests(arr)
        });
    },[])

    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-= All Functions 
    // -0-0-0-0-0-0-0-0-0-0-0-0-0 delete function
    let handleDelete = (currentRequest)=>{
        remove(ref(db,"/Requests/" + currentRequest.key))
    }
    // -0-0-0-0-0-0-0-0-0-0-0-0-0 accept function
    let handleAccept = (currentRequest)=>{
        remove(ref(db,"/Requests/" + currentRequest.key))
        set(push(ref(db, '/Friends'), {
            currentFriendId: currentUser.uid,
            currentFriendName: currentUser.displayName,
            currentFriendPicture: currentUser.photoURL,
            toFriendId: currentRequest.senderUid,
            toFriendName: currentRequest.username,
            toFriendPicture: currentRequest.profile_picture,
        }));

    }
  return (
    <section id='request'>
        <div className="req_head">
            <h1>Your Requests</h1>
        </div>
        <div className="requests">
            {
                allRequests.map((item)=>(
                    <div key={item.key} className="singleReqCard">
                        <div className="cardText">
                            <img src={item.profile_picture} alt="" />
                            <h2>{item.username}</h2>
                        </div>
                        <div className="cardButton">
                            <button onClick={()=>handleAccept(item)}>Accept</button>
                            <button onClick={()=>{handleDelete(item)}}>Delete</button>
                        </div>
                    </div>
                ))
            }
        </div>
    </section>
  )
}

export default Request