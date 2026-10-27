import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

const api = 'https://test-swagger-2ph6.onrender.com/users'

const Contacts = () => {
  const [users, setUsers] = useState([])
  const [editingUser, setEditingUser] = useState(null)

  const addmodal = useRef()
  const editmodal = useRef()

  const getUsers = async () => {
    try {
      const token = localStorage.getItem('token')
      const { data } = await axios.get(api, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setUsers(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem('token')

      await axios.delete(`${api}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      getUsers() 
    } catch (error) {
      if (error.response?.status === 403) {
        alert('Недостаточно прав: нужна роль admin')
      }
      console.log(error)
    }
  }

 const PostUser = async (e) => {
  e.preventDefault()
  const token = localStorage.getItem('token')
  const obj = {
    name: e.target.name.value,
  email: e.target.email.value,
  password: e.target.password.value,
  role: e.target.role.value,
  city: e.target.city.value
  }
  try {
    await axios.post(api , obj , {
      headers : {Authorization : `Bearer ${token}`}
    })
    getUsers()
    addmodal.current.close()
    

    await axios.post(api , )
  } catch (error) {
    console.log(error)
  }
 }

  const editShow = (elem) => {
    setEditingUser(elem)
    editmodal.current.showModal()
  }

  const editUser = async (e) => {
  e.preventDefault()
  const token = localStorage.getItem('token')
  const obj = {
    name: e.target.name.value,
    email: e.target.email.value,
    password: e.target.password.value,
    role: e.target.role.value,
    city: e.target.city.value
  }
  try {
    await axios.put(`${api}/${editingUser.id}`, obj, {
      headers : {Authorization : `Bearer ${token}`}
    })
    getUsers()
    editmodal.current.close()
  } catch (error) {
    console.log(error)
  }
 }

  return (
    <div>
      Call us!
      <dialog ref={addmodal}>
       <form onSubmit={PostUser} >
         <input type="text" placeholder='name...' name='name'/>
        <input type="text" placeholder='email...' name='email'/>
        <input type="text" placeholder='password...' name='password'/>
        <input type="text" placeholder='role...' name='role'/>
        <input type="text" placeholder='city...' name='city'/>
        <button type='submit'>Add</button>
       </form>
      </dialog>

       <dialog ref={editmodal}>
       <form onSubmit={editUser} key={editingUser?.id}>
         <input type="text" placeholder='name...' name='name' defaultValue={editingUser?.name}/>
        <input type="text" placeholder='email...' name='email' defaultValue={editingUser?.email}/>
        <input type="text" placeholder='password...' name='password' defaultValue={editingUser?.password}/>
        <input type="text" placeholder='role...' name='role' defaultValue={editingUser?.role}/>
        <input type="text" placeholder='city...' name='city' defaultValue={editingUser?.city}/>
        <button type='submit'>Edit</button>
       </form>
      </dialog>
      <button onClick={()=>addmodal.current.showModal()}>Add User</button>
      {users.map((elem) => (
        <div key={elem.id} className='flex gap-4 items-center'>
          <h1>{elem.name}</h1>
          <button onClick={() => deleteUser(elem.id)}>Delete</button>
          <button onClick={() => editShow(elem)}>edit</button>
        </div>
      ))}
    </div>
  )
}

export default Contacts