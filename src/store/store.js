import { configureStore } from '@reduxjs/toolkit'
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice'
import { calendarSlice } from './calendar/calendarSlice'
import { uiSlice } from './ui/uiSlice'

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    calendar: calendarSlice.reducer,
    ui: uiSlice.reducer

  }
})

export default store