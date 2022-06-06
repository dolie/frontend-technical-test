import type { FC, ReactElement } from 'react'
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
import Layout from '@/components/Layout'

const ProfilePage: FC = () => {
  const router = useRouter()

  const { profileId } = router.query

  const [conversations, setConversations] = useState<Conversation[]>(null)
  const [user, setUser] = useState<User>(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    if (!profileId) return
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

      <h1 className="title">
        Your Conversations :
      </h1>

      <div className="mb-7">
        {
          isLoading
            ? <p className="text-center">Loading conversations...</p>
            : <UserConversations conversations={conversations} user={user} />
        }
      </div>
      <BackButton />
    </div>
  )
}

export default ProfilePage

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
