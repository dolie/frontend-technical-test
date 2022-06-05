import axios from 'axios'
import type { Message } from '@/types/message'

// eslint-disable-next-line import/prefer-default-export
export async function getMessages(conversationId: string | string[]): Promise<Message[]|null> {
  const response = await axios.get(`/messages/${conversationId}`)
  return response.data
}

export async function postMessage(
  conversationId: number,
  message: string,
  profileId: number,
): Promise<Message|null> {
  const data = {
    body: message,
    timestamp: Date.now(),
    authorId: profileId,
    conversationId,
  }

  const response = await axios.post(`/messages/${conversationId}`, data)
  return response.data
}
