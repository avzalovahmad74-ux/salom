import React from 'react'
import { Navigate } from 'react-router'

const Authflow = ({ children }) => {
  const token = localStorage.getItem("token")

  if (!token) {
    return <Navigate to="/Login" replace />
  }

  return children
}

export default Authflow