import type { FC } from 'react'
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { getMessages } from '@/services/messages'
import { getUser } from '@/services/users'
import { Message } from '@/types/message'
import Head from 'next/head'
import MessageList from '@/components/MessageList'
import { User } from '@/types/user'
import BackButton from '@/components/BackButton'
import SendMessage from '@/components/SendMessage'
import { toast } from 'react-toastify'

const ConversationPage: FC = () => {
  const router = useRouter()

  const { profileId, conversationId } = router.query
  const [isLoading, setLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>(null)
  const [users, setUsers] = useState<User[]>(null)

  const fetchMessages = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getMessages(conversationId)
      setMessages(data)
    } catch {
      toast.error('Connot get messages')
    }
    setLoading(false)
  }, [conversationId, setMessages, setLoading])

  useEffect(() => {
    if (!conversationId) return
    fetchMessages()
  }, [conversationId, fetchMessages])

  useEffect(() => {
    if (!messages) return

    async function fetchUsers(uuids: number[]) {
      setLoading(true)

      try {
        const promises = uuids.map(async uuid => getUser(String(uuid)))
        const data = await Promise.all(promises)
        setUsers(data)
      } catch {
        toast.error('Connot get users informations')
      }
      setLoading(false)
    }

    const usersId = messages.map(message => message.authorId)
    const uniqueUsersIds = [...new Set(usersId)]

    fetchUsers(uniqueUsersIds)
  }, [messages])

  return (
    <div>
      <Head>
        <title>Messages</title>
      </Head>

      <BackButton />

      <h1>
        Messages
      </h1>

      <div>
        {
          isLoading
            ? <p>Loading messages...</p>
            : <MessageList messages={messages} profileId={String(profileId)} users={users} />
        }
      </div>

      <SendMessage
        isLoading={isLoading}
        fetchMessages={fetchMessages}
        conversationId={String(conversationId)}
        profileId={String(profileId)}
      />
    </div>
  )
}

export default ConversationPage
