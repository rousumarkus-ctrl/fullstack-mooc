import { createSlice } from "@reduxjs/toolkit"

const initialState = ''



const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notificationChange(state,action) {
      return action.payload
    },
  }
})

export const { notificationChange } = notificationSlice.actions

export const setNotification = (message,time) => {
  return async dispatch => {
    dispatch(notificationChange(message))
    setTimeout(() => {
      dispatch(notificationChange(''))
    },time*1000)
  }
}

export default notificationSlice.reducer