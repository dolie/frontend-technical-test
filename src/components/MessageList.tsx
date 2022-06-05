import type { FC } from 'react'
import { useMemo } from 'react'
import { Message } from '@/types/message'
import { User } from '@/types/user'

interface MessageListProps {
  messages: Message[];
  profileId: string;
  users: User[];
}

const MessageList: FC<MessageListProps> = ({ messages, profileId, users }) => {
  const formattedMessages = useMemo(() => {
    if (!messages || !users) return null

    return messages.map(message => {
      const author = users.find(u => String(u.id) === String(message.authorId))

      let authorName = 'Unknown'

      if (String(author?.id) === profileId) {
        authorName = 'You'
      } else if (author) {
        authorName = author.nickname
      }

      const date = new Date(message.timestamp)
      const dateString = new Intl.DateTimeFormat('en-EN', { dateStyle: 'short', timeStyle: 'short' }).format(date)

      return {
        ...message,
        author: authorName,
        date: dateString,
      }
    })
  }, [messages, profileId, users])

  return (
    <div>
      {!messages || !users || !messages.length
        ? <p>No messages to display</p>
        : (
          <ul>
            {formattedMessages.map(message => (
              <li key={message.id}>
                <figure>
                  <figcaption>
                    <cite>{message.author}</cite>
                    <p>{message.date}</p>
                  </figcaption>

                  <blockquote>
                    {message.body}
                  </blockquote>
                </figure>
              </li>
            ))}
          </ul>
        )}
    </div>
  )
}

export default MessageList
