import axios from "axios"

const BASE = 'https://test-swagger-2ph6.onrender.com'

export async function loginRequest(obj) {
  try {
    let { data } = await axios.post(`${BASE}/auth/login`, obj)
    const token = data.token
    if (token) {
      localStorage.setItem('token', token)
    }
    return token
  } catch (error) {
    console.log(error)
  }
}

export async function getMe() {
  const token = localStorage.getItem('token')

  const { data } = await axios.get(`${BASE}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  return data
}