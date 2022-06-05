import type { FC } from 'react'
import Link from 'next/link'
import { User } from '@/types/user'

interface UserListProps {
  users: User[];
}

const UserList: FC<UserListProps> = ({ users }) => (
  !users || !users.length
    ? <p>No users to display</p>
    : (
      <div>
        <h2>Login as : </h2>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <Link href={`/profile/${user.id}`}>
                {user.nickname}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
)

export default UserList
