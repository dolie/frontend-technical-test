import UserConversations from '@/components/UserConversations'
import { render, screen } from '@testing-library/react' // eslint-disable-line import/no-extraneous-dependencies
import { conversations } from '@/services/__fixtures__/conversations'
import { users } from '@/services/__fixtures__/users'

describe('UserConversations', () => {
  it('renders no conversations', () => {
    render(<UserConversations conversations={[]} user={users[0]} />)
    expect(screen.getByText('No conversations to display')).toBeInTheDocument()
  })

  it('renders no conversations', () => {
    render(<UserConversations conversations={null} user={users[0]} />)
    expect(screen.getByText('No conversations to display')).toBeInTheDocument()
  })

  it('format & renders correctly conversations', () => {
    const convMessages = conversations.filter(c => c.recipientId === 1 || c.senderId === 1)

    render(<UserConversations conversations={convMessages} user={users[0]} />)

    const conversation1 = screen.getAllByText('Jeremie')
    const conversation2 = screen.getAllByText('Patrick')
    const conversation3 = screen.getAllByText('Elodie')

    const date = screen.getAllByText('Last message : Monday, January 19, 1970 at 8:33 PM')
    const date2 = screen.getAllByText('Last message : Monday, January 19, 1970 at 8:34 PM')
    const date3 = screen.getAllByText('Last message : Monday, January 19, 1970 at 7:04 PM')

    const links = screen.getAllByRole('link')

    expect(conversation1.length).toBe(1)
    expect(conversation2.length).toBe(1)
    expect(conversation3.length).toBe(1)

    expect(date.length).toBe(1)
    expect(date2.length).toBe(1)
    expect(date3.length).toBe(1)

    const expected = [
      '/profile/1/conversation/1',
      '/profile/1/conversation/2',
      '/profile/1/conversation/3',
    ]

    expect(links.map(l => l.getAttribute('href'))).toEqual(expected)
  })
})
