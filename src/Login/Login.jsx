import { loginRequest } from '@/Log'
import React from 'react'
import { Navigate, useNavigate,  } from 'react-router'

const Login = () => {
const navigate = useNavigate()

  if (localStorage.getItem("token")) {
    return <Navigate to="/" replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const obj = {
      email : e.target.email.value ,
      password : e.target.password.value 
    }
 const token = await  loginRequest(obj)
 if(token){
  navigate('/' , {replace:true})
 }

  }

  return (
    <div className='m-auto w-325 flex justify-center my-20'>
      <form
        onSubmit={handleSubmit}
        className='flex border-2 border-amber-400 p-10 rounded-2xl items-start flex-col gap-8'
      >
        <h1 className='text-amber-400 font-semibold text-3xl'>Login</h1>
        <input className='p-3 border-2 border-amber-400 rounded-2xl' type="email" placeholder='email' name='email' />
        <input className='p-3 border-2 border-amber-400 rounded-2xl' type="password" placeholder='password' name='password' />
        <button className='p-3 border-2 border-amber-400 rounded-2xl w-full' type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login