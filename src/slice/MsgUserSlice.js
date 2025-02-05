import { createSlice } from '@reduxjs/toolkit'

export const MsgUserSlice = createSlice({
  name: 'MsgUser',
  initialState: {
    value: JSON.parse(localStorage.getItem('currentMsgUser'))?JSON.parse(localStorage.getItem('currentMsgUser')):null,
  },
  reducers: {
    MsgUserData: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { MsgUserData } = MsgUserSlice.actions

export default MsgUserSlice.reducer