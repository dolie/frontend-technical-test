import axios from 'axios'
import type { Conversation } from '@/types/conversation'

// eslint-disable-next-line import/prefer-default-export
export async function getConversations(profileId: string | string[]): Promise<Conversation[]|null> {
  const response = await axios.get(`/conversations/${profileId}`)
  return response.data
}
