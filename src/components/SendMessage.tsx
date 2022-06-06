import type { FC } from 'react'
import { useState } from 'react'
import { postMessage } from '@/services/messages'
import { toast } from 'react-toastify'
import BackButton from '@/components/BackButton'

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

    <form onSubmit={e => handleSubmit(e)} className="text-center flex flex-col">

      <textarea
        placeholder="Write something here"
        value={value}
        onChange={({ target }) => setValue(target.value)}
        readOnly={isLoading}
        className="border border-solid border-white bg-black w-2/3 mb-4 mx-auto"
      />

      <div className="flex justify-between w-3/4 mx-auto">
        <BackButton />

        <button type="submit" disabled={isLoading} className="btn-primary w-5/12 p-2">
          Send
        </button>
      </div>
    </form>
  )
}

export default SendMessage
