import type { FC } from 'react'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Logo from '@/assets/lbc-logo.webp'
import styles from '@/styles/Home.module.css'
import { getUsers } from '@/services/users'
import UserList from '@/components/UserList'
import { toast } from 'react-toastify'

const HomePage: FC = () => {
  const year = new Date().getFullYear()

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
    <div className={styles.container}>
      <Head>
        <title>Frontend Technical test - Leboncoin</title>
        <meta name="description" content="Frontend exercise for developpers who want to join us on leboncoin.fr" />
      </Head>

      <Image src={Logo} alt="Leboncoin Frontend Team" width={400} height={125} layout="fixed" />
      <h1 className={styles.description}>
        Welcome !
      </h1>

      <div>
        {
          isLoading
            ? <p>Loading users...</p>
            : <UserList users={users} />
        }
      </div>

      <footer className={styles.footer}>
        &copy; leboncoin -
        {' '}
        {year}
      </footer>
    </div>
  )
}

export default HomePage
