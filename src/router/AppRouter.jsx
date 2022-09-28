import React from 'react'
import { useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router'
import LoginPage from '../auth/pages/LoginPage'
import CalendarPage from '../calendar/pages/CalendarPage'
import CalendarApp from '../CalendarApp'
import { getEnvVariables } from '../helpers/getEnvVariables'
import useAuthStore from '../hooks/useAuthStore'

const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();
  useEffect(() => {
    checkAuthToken();
  }, [])

  // const authStatus = 'not-authenticated'//'authenticated' //'no-authenticated'

  if (status === 'checking') {
    return (
      <h3>
        Cargando...
      </h3>
    )
  }

  return (
    <Routes>
      {
        (status === 'not-authenticated')
          ? (
            <>
              <Route path='/auth/*' element={<LoginPage />} />
              <Route path="/*" element={<Navigate to='/auth/login' />} />
            </>
          )
          : (
            <>
              <Route path='/' element={<CalendarPage />} />
              <Route path="/*" element={<Navigate to='/' />} />
            </>
          )
      }
    </Routes>
  )
}

export default AppRouter