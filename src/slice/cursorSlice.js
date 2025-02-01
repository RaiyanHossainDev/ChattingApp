import { createSlice } from '@reduxjs/toolkit'

export const cursorSlice = createSlice({
  name: 'cursor',
  initialState: {
    value: false,
  },
  reducers: {
    cursorData: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { cursorData } = cursorSlice.actions

export default cursorSlice.reducer