import type { FC } from 'react'
import { useMemo } from 'react'
import { Conversation } from '@/types/conversation'
import { User } from '@/types/user'
import Link from 'next/link'

interface UserConversationsProps {
  conversations: Conversation[];
  user: User;
}

const UserConversations: FC<UserConversationsProps> = ({ conversations, user }) => {
  const formattedConversation = useMemo(() => {
    if (!conversations) return null

    return conversations.map(conversation => {
      const protagonist = [
        conversation.recipientNickname,
        conversation.senderNickname,
      ].filter(nickname => nickname !== user?.nickname).join(', ')

      const date = new Date(conversation.lastMessageTimestamp)

      const lastMessageDateString = new Intl.DateTimeFormat('en-EN', { dateStyle: 'full', timeStyle: 'short' }).format(date)

      return {
        ...conversation,
        protagonist,
        lastMessageDateString,
      }
    })
  }, [conversations, user])

  return (
    <div>
      {!conversations || !formattedConversation.length
        ? <p>No conversations to display</p>
        : (
          <ul>
            {formattedConversation.map(conversation => (
              <li key={conversation.id}>

                <Link href={`/profile/${user.id}/conversation/${conversation.id}`}>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a>
                    <h3>{conversation.protagonist}</h3>

                    <p>
                      Last message :
                      {' '}
                      {conversation.lastMessageDateString}
                    </p>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        )}
    </div>
  )
}

export default UserConversations
