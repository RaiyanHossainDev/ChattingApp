import { configureStore } from '@reduxjs/toolkit'
import  userSlice  from './slice/userSlice'
import  cursorSlice  from './slice/cursorSlice'

export default configureStore({
  reducer: {
    currentUser : userSlice,
    cursor: cursorSlice,
  },
})