import { render, waitFor, screen } from '@testing-library/react' // eslint-disable-line
import '@testing-library/jest-dom' // eslint-disable-line import/no-extraneous-dependencies
import { users } from '@/services/__fixtures__/users'
import Home from './index'

const mockUsers = users

let mockGetUsers = jest.fn()

jest.mock('@/services/users', () => ({
  getUsers: () => mockGetUsers(),
}))

const mockToastError = jest.fn()

jest.mock('react-toastify', () => ({
  toast: {
    error: () => mockToastError(),
  },
}))

describe('Home page', () => {
  it('should render correctly App', async () => { // initial test
    render(<Home />)

    let welcome

    await waitFor(() => { welcome = screen.getByText(/Welcome/) })

    expect(welcome).toBeInTheDocument()
  })

  it('should display Loading', async () => {
    mockGetUsers = jest.fn(() => new Promise(resolve => { setTimeout(resolve, 1000, mockUsers) }))

    render(<Home />)

    let loadingText

    await waitFor(() => { loadingText = screen.getByText('Loading users...') })

    expect(loadingText).toBeInTheDocument()
  })

  test.each(
    users,
  )('displays user %s\'s login button', async user => {
    mockGetUsers = jest.fn(() => Promise.resolve(mockUsers))

    render(<Home />)

    let loginButton

    await waitFor(() => { loginButton = screen.getByText(user.nickname) })

    expect(loginButton).toBeInTheDocument()
    expect(loginButton).toHaveAttribute('href', `/profile/${user.id}`)
  })

  it('handles server error', async () => {
    mockGetUsers = jest.fn(() => Promise.reject(new Error('Server error')))

    render(<Home />)

    let errorMessage

    await waitFor(() => { errorMessage = screen.getByText('No users to display') })

    expect(errorMessage).toBeInTheDocument()
    expect(mockToastError).toHaveBeenCalled()
  })
})
