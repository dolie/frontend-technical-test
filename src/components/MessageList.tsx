import type { FC } from 'react'
import { useMemo, useRef, useEffect } from 'react'
import { Message } from '@/types/message'
import { User } from '@/types/user'

interface MessageListProps {
  messages: Message[];
  profileId: string;
  users: User[];
}

const MessageList: FC<MessageListProps> = ({ messages, profileId, users }) => {
  const listRef = useRef(null)

  const formattedMessages = useMemo(() => {
    if (!messages || !users) return null

    return messages.map(message => {
      const author = users.find(u => String(u.id) === String(message.authorId))

      let authorName = 'Unknown'
      let isFromMe = false

      if (String(author?.id) === profileId) {
        authorName = 'You'
        isFromMe = true
      } else if (author) {
        authorName = author.nickname
      }

      const date = new Date(message.timestamp)
      const dateString = new Intl.DateTimeFormat('en-EN', { dateStyle: 'short', timeStyle: 'short' }).format(date)

      return {
        ...message,
        author: authorName,
        isFromMe,
        date: dateString,
      }
    })
  }, [messages, profileId, users])

  useEffect(() => {
    if (!listRef.current) return

    listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages])

  return (
    <div>
      {!messages || !users || !messages.length
        ? <p className="text-center">No messages to display</p>
        : (
          <ul className="h-[45vh] overflow-auto border-b border-white border-t" ref={listRef}>
            {formattedMessages.map(message => (
              <li key={message.id} className={message.isFromMe ? 'card-right' : 'card-left'}>
                <div className="w-5 h-5 border border-white mx-4" />

                <figure className={message.isFromMe ? 'card-col-right' : 'card-col-left'}>
                  <figcaption className="bg-white text-black px-2">
                    <cite>{message.author}</cite>
                    <p>{message.date}</p>
                  </figcaption>

                  <blockquote className="p-2">
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
