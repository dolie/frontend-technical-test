import axios from 'axios'
import { User } from '@/types/user'

export async function getUsers(): Promise<User[]> {
  const response = await axios.get('/users')
  return response.data
}

export async function getUser(id: string): Promise<User> {
  const response = await axios.get(`/users/${id}`)
  return response.data
}
