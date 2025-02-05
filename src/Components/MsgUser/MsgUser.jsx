import './MsgUser.css'
import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue } from "firebase/database";
import { useDispatch, useSelector } from 'react-redux';
import { MsgUserData } from '../../slice/MsgUserSlice';

const MsgUser = () => {
  // =-=-=-=-=-=-=-=-= custom variables
  const [allFriends,setAllFriends] = useState([])

    
  // =-=-=-=-=-=- Firebase variables
  const db = getDatabase();

  // =-=-=-=-=-=-=-=- Redux variables
  const  currentUser = useSelector(a => a.currentUser.value)
  const  dispatch    = useDispatch()

  
  // -=-=-=-=-=-=-= Reading data
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
  
  let handleSelect = (item)=>{
    dispatch(MsgUserData(item))
    localStorage.setItem('currentMsgUser' , JSON.stringify(item))
  }

    return (
        <section id="sideUsers">
            <ul>
                {
                    allFriends.map((item)=>(
                        <li onClick={()=>handleSelect(item)} key={item.key}>
                            <img src={item.friendPicture} alt="" />
                            <h2>{item.friendName}</h2>
                        </li>
                    ))
                }
            </ul>
        </section>
    )
}

export default MsgUser