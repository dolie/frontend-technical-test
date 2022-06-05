import UserList from '@/components/UserList'
import { render, screen } from '@testing-library/react' // eslint-disable-line import/no-extraneous-dependencies
import { users } from '@/services/__fixtures__/users'

describe('UserList', () => {
  it('renders message if no users is empty', () => {
    render(<UserList users={[]} />)

    expect(screen.getByText('No users to display')).toBeInTheDocument()
  })
  it('renders message if no users is nullish', () => {
    render(<UserList users={null} />)

    expect(screen.getByText('No users to display')).toBeInTheDocument()
  })
  it('correctly users', () => {
    render(<UserList users={users} />)

    expect(screen.getByText('Jeremie')).toBeInTheDocument()
    expect(screen.getByText('Patrick')).toBeInTheDocument()
    expect(screen.getByText('Elodie')).toBeInTheDocument()

    const links = screen.getAllByRole('link')

    const expected = [
      '/profile/1',
      '/profile/2',
      '/profile/3',
      '/profile/4',
    ]

    expect(links.map(l => l.getAttribute('href'))).toEqual(expected)
  })
})
