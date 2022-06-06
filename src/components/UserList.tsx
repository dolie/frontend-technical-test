import type { FC } from 'react'
import Link from 'next/link'
import { User } from '@/types/user'

interface UserListProps {
  users: User[];
}

const UserList: FC<UserListProps> = ({ users }) => (
  !users || !users.length
    ? <p className="text-center">No users to display</p>
    : (
      <div>
        <h2 className="text-center mb-5">Login as : </h2>
        <ul>
          {users.map(user => (
            <li key={user.id} className="text-center btn-primary w-1/2">
              <Link href={`/profile/${user.id}`} passHref>
                <a href="toUserPage" className="inline-block w-full h-full p-2">
                  {user.nickname}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
)

export default UserList
