import React from 'react'
import { Route, Routes } from 'react-router'
import LoginPage from '../auth/pages/LoginPage'
import CalendarPage from '../calendar/pages/CalendarPage'
import CalendarApp from '../CalendarApp'

const AppRouter = () => {

  const authStatus = 'authenticated'//'authenticated' //'no-authenticated'
  return (
    <Routes>
      {
        authStatus === 'no-authenticated'
          ? <Route path='/auth/*' element = {<LoginPage />} />
          : <Route path='/*' element={<CalendarPage />} />
      }

    </Routes>
  )
}

export default AppRouter