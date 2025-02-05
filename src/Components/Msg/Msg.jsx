import React, { useEffect, useRef, useState } from 'react'
import './Msg.css'
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector }               from 'react-redux';
import MsgUser                       from '../MsgUser/MsgUser';
import EmojiPicker                   from 'emoji-picker-react';
import { FaPaperPlane } from 'react-icons/fa';
import { MdEmojiEmotions } from 'react-icons/md';



const Msg = () => {
    // =-=-=-=-=-=-=-=-= custom variables
    const [ emojiShow,setEmojiShow] = useState(false)
    const [text,setText] = useState('')
    const [msg,setMsg] = useState([])
    
    // =-=-=-=-=-=- Firebase variables
    const db = getDatabase();

    // =-=-=-=-=-=-=-=- Redux variables
    const currentUser    = useSelector(a => a.currentUser.value)
    const currentMsgUser = useSelector(a => a.currentMsgUser.value)

    // -=-=-=-=-=-=-= Reading data
    useEffect(()=>{
        onValue(ref(db, '/messeges'), (snapshot) => {
            let arr =[]
            snapshot.forEach((item)=>{
                if (item.val().currentUserUid == currentUser.uid && item.val().friendUid == currentMsgUser.friendUid) {
                    arr.push({...item.val(),key:item.key})
                }else if(item.val().currentUserUid == currentMsgUser.friendUid && item.val().friendUid == currentUser.uid){
                    arr.push({...item.val(),key:item.key})
                }
            })
            setMsg(arr)
        });
    },[currentMsgUser])



    let handleSubmit = ()=>{
        setText('')
        set(push(ref(db, '/messeges'),{
            currentUserUid: currentUser.uid,
            messege: text,
            friendUid: currentMsgUser.friendUid,
        }))
    }


  
  return (
    <section id        = 'msg'>
    <div     className = "MsgPage">
                {
                    currentMsgUser == null?
                        <div className = "MsgNotFound">
                        <img src       = "images/notFound.gif" alt = "" />
                            <h2>No User is selected</h2>
                            <p>Select a user</p>
                        </div>
                    : 
                    <div className = "msgBox">
                        <div className = "MsgHead">
                            <img src       = {currentMsgUser.friendPicture} alt = "" />
                            <h2>{currentMsgUser.friendName}</h2>
                        </div>
                        <div className = "Messeges">
                            {
                                msg.map((item)=>{
                                    if (item.currentUserUid == currentUser.uid) {
                                        return(
                                            <div className = "myMsg">
                                                <h2>{item.messege}</h2>
                                            </div>
                                        )
                                    }else{
                                        return(
                                            <div className = "friendsMsg">
                                                <h2>{item.messege}</h2>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                        <div className = "msgInputBar">
                            <textarea 
                                placeholder="Write a message..."
                                onChange={(e)=>setText(e.target.value)}
                                onKeyDown={(e)=>{e.key === 'Enter'&&handleSubmit()}}
                                value={text}
                            >
                            </textarea>
                            <FaPaperPlane onClick={()=>handleSubmit()} />
                            <MdEmojiEmotions onClick={()=>setEmojiShow(!emojiShow)} />
                            <div className="emojiBar">
                                <EmojiPicker onEmojiClick={e => setText( e.emoji != "🫠"?text -+ e.emoji:text)}   open={emojiShow}/>
                            </div>
                        </div>
                    </div>
                }
        </div>
        <MsgUser/>
    </section>
  )
}

export default Msg