import React, { useEffect, useState } from 'react'
import './Block.css'
import { useSelector } from 'react-redux'
import { getDatabase, onValue, ref, remove, set } from '@firebase/database'

const Block = () => {
    // =-=-=-=-=-=-=-=-=-= custom variables
    const [allBlocks,setAllBlocks] = useState([])

    // =-=-=-=-=-=-=-=- Redux
    const currentUser = useSelector(a => a.currentUser.value)

    // -=--=-=-=-=-=-=-=-=--=- Data
    const db = getDatabase()
    useEffect(()=>{
        onValue(ref(db, '/BlockList'), (snapshot) => {
            let arr = []
            snapshot.forEach((item)=>{
               if (item.val().currentUserUid == currentUser.uid) {
                arr.push({...item.val(),key: item.key})
               }
            });
            setAllBlocks(arr)
        });
    },[])

    let handleUnBlock = (item)=>{
        remove(ref(db, '/BlockList/' + item.key))
    }
    
  return (
    <section id='blockList'>
        <div className="BlockHead">
            <h1>Block List</h1>
        </div>
        <div className="BlockList">
            {
                allBlocks.map((item)=>(
                    <div key={item.key} className="singleBlockFriend flex items-center justify-between px-[60px]">
                        <div className="text flex items-center gap-2">
                            <img className='w-[100px]' src={item.blockFriendPicture} alt="" />
                            <h2 className=' text-[24px] font-pop font-semibold'>{item.blockFriendName}</h2>
                        </div>
                        <button onClick={()=>handleUnBlock(item)} className=' bg-brand font-pop text-[18px] font-semibold text-white px-[10px] py-[5px] rounded-md'>UnBlock</button>
                    </div>
                ))
            }
        </div>
    </section>
  )
}

export default Block