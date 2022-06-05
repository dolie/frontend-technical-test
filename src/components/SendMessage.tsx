import type { FC } from 'react'
import { useState } from 'react'
import { postMessage } from '@/services/messages'
import { toast } from 'react-toastify'

interface SendMessageProps {
  isLoading: boolean;
  fetchMessages: () => void;
  conversationId: string;
  profileId: string;
}

const SendMessage:FC<SendMessageProps> = ({
  isLoading, fetchMessages, conversationId, profileId,
}) => {
  const [value, setValue] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      await postMessage(parseInt(conversationId, 10), value, parseInt(profileId, 10))
      fetchMessages()
      setValue('')
    } catch (e) {
      toast.error('Your message could not be sent')
    }
  }

  return (

    <form onSubmit={e => handleSubmit(e)}>

      <textarea
        placeholder="Write something here"
        value={value}
        onChange={({ target }) => setValue(target.value)}
        readOnly={isLoading}
      />
      <input type="submit" value="Send" readOnly={isLoading} />
    </form>
  )
}

export default SendMessage
