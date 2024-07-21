import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { getLoggedInUser } from '../redux/auth/authSlice'

function PrivateRoutes({ element }) {
  const user = useSelector(getLoggedInUser) || {}

  return Object.keys(user).length !== 0 ? element: <Navigate to= '/login' />
}

export default PrivateRoutes