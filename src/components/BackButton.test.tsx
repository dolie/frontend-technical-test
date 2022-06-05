import BackButton from '@/components/BackButton'
import { render } from '@testing-library/react' // eslint-disable-line import/no-extraneous-dependencies

const mockBack = jest.fn()

jest.mock('next/router', () => ({
  back: () => mockBack(),
}))

describe('BackButton', () => {
  it('renders', () => {
    const { getByText } = render(<BackButton />)
    expect(getByText('< Back')).toBeInTheDocument()
  })

  it('calls onClick', () => {
    const { getByText } = render(<BackButton />)
    getByText('< Back').click()
    expect(mockBack).toHaveBeenCalled()
  })
})
