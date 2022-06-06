import type { FC, ReactElement } from 'react'
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import Head from 'next/head'

import { getMessages } from '@/services/messages'
import { getUser } from '@/services/users'

import { Message } from '@/types/message'
import { User } from '@/types/user'

import Layout from '@/components/Layout'
import MessageList from '@/components/MessageList'
import SendMessage from '@/components/SendMessage'

const ConversationPage: FC = () => {
  const router = useRouter()

  const { profileId, conversationId } = router.query
  const [isLoading, setLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>(null)
  const [users, setUsers] = useState<User[]>(null)

  const fetchMessages = useCallback(async () => {
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
    setLoading(true)
    fetchMessages()
  }, [conversationId, fetchMessages])

  useEffect(() => {
    if (users || !messages) return

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
  }, [messages, users])

  return (

    <div className="flex flex-col justify-between">
      <Head>
        <title>Messages</title>
      </Head>

      <div className="mb-10">

        <h1 className="title">
          Messages
        </h1>

        <div>
          {
          isLoading
            ? <p className="text-center">Loading messages...</p>
            : <MessageList messages={messages} profileId={String(profileId)} users={users} />
        }
        </div>
      </div>

      <div>
        <SendMessage
          isLoading={isLoading}
          fetchMessages={fetchMessages}
          conversationId={String(conversationId)}
          profileId={String(profileId)}
        />
      </div>
    </div>
  )
}

export default ConversationPage

ConversationPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
