import React, { useEffect, useState } from 'react'
import './Sent.css'
import { useSelector } from 'react-redux'
import { getDatabase, onValue, ref, set  } from 'firebase/database'

const Sent = () => {
    // =-=-=-=-=-=-=-=-=-=-=-= custom variables
    const [Sents,setSents] = useState([])
    const [sentUsers,setSentUsers] = useState([])

    // =-=-=-=-=-=-=-=-=-=-=-= Redux variables
    const currentUser = useSelector(a => a.currentUser.value)


    // =-=-=-=-=-=-=-=-=-=-=-= Reading Data
    const db = getDatabase()
    useEffect(()=>{
        onValue(ref(db, '/Requests'), (snapshot) => {
            let arr = []
            snapshot.forEach((item)=>{
                if (item.val().senderUid == currentUser.uid) {
                    arr.push(item.val().toUid)
                }
                setSents(arr)
            })
            let arr2 = []
            onValue(ref(db, '/AllUsers'), (snapshot) => {
                snapshot.forEach((item)=>{
                    if (arr.includes(item.val().uid)) {
                        arr2.push(item.val())
                    }
                })
            setSentUsers(arr2)
            });
        });
        
            
    },[])
    // =-=-=-=-=-=-=-=

    console.log(sentUsers);
    

  return (
    <section id='sent'>
        <div className="sent_head">
            <h1>Sent</h1>
        </div>
        <div className="SentUsers">
            {
                sentUsers.map((item)=>(
                    <div key={item.uid} className="singleSentUsers">
                        <img src={item.profile_picture} alt="" />
                        <h1>{item.username}</h1>
                    </div>
                ))
            }
        </div>
    </section>
  )
}

export default Sent