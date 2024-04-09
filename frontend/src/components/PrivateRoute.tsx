import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

const PrivateRoute = () => {
  const user = useSelector((state: RootState) => state.user)


  return user.refresh_token ? <Outlet /> : <Navigate to="/signin" replace />
}

export default PrivateRoute