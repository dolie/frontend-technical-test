import MessageList from '@/components/MessageList'
import { render, screen } from '@testing-library/react' // eslint-disable-line import/no-extraneous-dependencies
import { messages } from '@/services/__fixtures__/messages'
import { users } from '@/services/__fixtures__/users'

describe('MessageList', () => {
  const props = {
    messages: [],
    profileId: '',
    users: null,
  }

  it('renders no messages', () => {
    render(<MessageList {...props} users={users} />)
    expect(screen.getByText('No messages to display')).toBeInTheDocument()
  })

  it('renders no messages', () => {
    render(<MessageList {...props} messages={messages} />)
    expect(screen.getByText('No messages to display')).toBeInTheDocument()
  })

  it('format & renders correctly messages', () => {
    const convMessages = messages.filter(m => m.conversationId === 1)

    render(<MessageList messages={convMessages} users={users} profileId="1" />)

    const youElements = screen.getAllByText('You')
    const protagonist = screen.getAllByText('Jeremie')
    const date = screen.getAllByText('1/19/70, 8:33 PM')
    const date2 = screen.getAllByText('1/19/70, 8:34 PM')
    const body = screen.getByText('Bonjour c\'est le premier message de la première conversation')
    const body2 = screen.getByText('Bonjour c\'est le deuxième message de la première conversation')
    const body3 = screen.getByText('Bonjour c\'est le troisième message de la première conversation')

    expect(youElements.length).toBe(2)
    expect(protagonist.length).toBe(1)
    expect(date.length).toBe(2)
    expect(date2.length).toBe(1)
    expect(body).toBeInTheDocument()
    expect(body2).toBeInTheDocument()
    expect(body3).toBeInTheDocument()
  })

  it('should render unknown if user is not found', () => {
    const convMessages = messages.filter(m => m.conversationId === 1)

    render(<MessageList messages={convMessages} users={[]} profileId="1" />)

    const unknownAuthor = screen.getAllByText('Unknown')

    expect(unknownAuthor.length).toBe(3)
  })
})
