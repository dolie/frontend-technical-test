import type { FC } from 'react'
import { useRouter } from 'next/router'
import { getConversations } from '@/services/conversations'
import { getUser } from '@/services/users'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { Conversation } from '@/types/conversation'
import { User } from '@/types/user'
import UserConversations from '@/components/UserConversations'
import BackButton from '@/components/BackButton'
import { toast } from 'react-toastify'

const ProfilePage: FC = () => {
  const router = useRouter()

  const { profileId } = router.query

  const [conversations, setConversations] = useState<Conversation[]>(null)
  const [user, setUser] = useState<User>(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)

      try {
        const dataConv = await getConversations(String(profileId))

        setConversations(dataConv)

        const dataUser = await getUser(String(profileId))

        setUser(dataUser)
      } catch {
        toast.error('Connot get conversations')
      }

      setLoading(false)
    }

    fetchData()
  }, [profileId])

  return (
    <div>
      <Head>
        <title>Your conversations</title>
      </Head>

      <BackButton />

      <h1>Your Conversations :</h1>

      <div>
        {
          isLoading
            ? <p>Loading conversations...</p>
            : <UserConversations conversations={conversations} user={user} />
        }
      </div>
    </div>
  )
}

export default ProfilePage
