import type { FC, ReactElement } from 'react'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { getUsers } from '@/services/users'
import UserList from '@/components/UserList'
import { toast } from 'react-toastify'
import Layout from '@/components/Layout'

const HomePage: FC = () => {
  const [users, setUsers] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true)

      try {
        const fetchedUsers = await getUsers()

        setUsers(fetchedUsers)
      } catch (e) {
        toast.error('Connot get users')
      }

      setLoading(false)
    }

    fetchUsers()
  }, [])

  return (
    <div className="flex flex-col justify-between">
      <Head>
        <title>Frontend Technical test - Leboncoin</title>
        <meta name="description" content="Frontend exercise for developpers who want to join us on leboncoin.fr" />
      </Head>

      <h1 className="title">
        Welcome !
      </h1>

      <div>
        {
          isLoading
            ? <p className="text-center">Loading users...</p>
            : <UserList users={users} />
        }
      </div>

    </div>
  )
}

export default HomePage

HomePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
