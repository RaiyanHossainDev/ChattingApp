import { configureStore } from '@reduxjs/toolkit'
import  userSlice  from './slice/userSlice'
import  cursorSlice  from './slice/cursorSlice'
import  searchSlice  from './slice/searchSlice'
import  MsgUserSlice  from './slice/MsgUserSlice'

export default configureStore({
  reducer: {
    currentUser : userSlice,
    cursor: cursorSlice,
    currentSearchKey: searchSlice,
    currentMsgUser: MsgUserSlice,
  },
})