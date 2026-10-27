import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router'
import { getMe } from '@/Log'

const Dash = () => {
  const navigate = useNavigate()

 useEffect(() => {
  const loadUser = async () => {
    try {
      await getMe()
    } catch (error) {

      if (error) {
        localStorage.removeItem('token')
        navigate('/Login', { replace: true })
      }
    }
  }

  loadUser()
}, [navigate])

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/Login', { replace: true })
  }

  return (
    <div>
      <div className='max-w-400 m-auto bg-amber-100'>
        <header className='w-325 m-auto py-3 border-b-2 border-b-amber-400 text-amber-400 font-semibold flex items-center justify-center gap-6'>
          <Link to={'/'}>Home</Link>
          <Link to={'/About'}>About</Link>
          <Link to={'/Contacts'}>Contacts</Link>

          <button onClick={logout}>Выйти</button>
        </header>
      </div>

      <div className='w-325 m-auto my-10'>
        <Outlet />
      </div>
    </div>
  )
}

export default Dash