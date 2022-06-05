import SendMessage from '@/components/SendMessage'
import { // eslint-disable-line import/no-extraneous-dependencies
  screen, render, fireEvent, waitFor, act,
} from '@testing-library/react'

let mockPostMessage = jest.fn((a, b, c) => Promise.resolve({ a, b, c }))

jest.mock('@/services/messages', () => ({
  postMessage: (a, b, c) => mockPostMessage(a, b, c),
}))

const mockToastError = jest.fn()

jest.mock('react-toastify', () => ({
  toast: {
    error: () => mockToastError(),
  },
}))

const magicSentence = 'Hello, my name is Dolie, I would really like to work with you 🙂'

const props = {
  isLoading: false,
  fetchMessages: jest.fn(),
  conversationId: '1',
  profileId: '1',
}

describe('SendMessage', () => {
  it('renders', () => {
    render(<SendMessage {...props} />)
    expect(screen.getByPlaceholderText('Write something here')).toBeInTheDocument()
  })

  it('send correct datas, refetch message, and erase input', async () => {
    render(<SendMessage {...props} />)

    const input = screen.getByPlaceholderText('Write something here')

    await waitFor(() => fireEvent.change(input, { target: { value: magicSentence } }))

    const button = screen.getByText('Send')

    await waitFor(() => fireEvent.click(button))

    expect(mockPostMessage).toHaveBeenCalledWith(
      1,
      magicSentence,
      1,
    )

    expect(props.fetchMessages).toHaveBeenCalledTimes(1)

    await waitFor(() => expect(input).toBeEmptyDOMElement())
  })

  it('should call toast and not erase input', async () => {
    mockPostMessage = jest.fn((a, b, c) => Promise.reject(new Error(`Error ${a + b + c}`)))

    render(<SendMessage {...props} />)

    const input = screen.getByPlaceholderText('Write something here')

    await fireEvent.change(input, { target: { value: magicSentence } })

    const button = screen.getByText('Send')

    await fireEvent.click(button)

    expect(mockPostMessage).toHaveBeenCalledWith(
      1,
      magicSentence,
      1,
    )

    expect(props.fetchMessages).toHaveBeenCalledTimes(1) // instead of 2 in case of success
    expect(mockToastError).toHaveBeenCalledTimes(1)

    await waitFor(() => expect(input).toHaveTextContent(magicSentence))
  })
})
