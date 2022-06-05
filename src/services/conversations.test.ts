import { rest } from 'msw' // eslint-disable-line import/no-extraneous-dependencies
import { setupServer } from 'msw/node' // eslint-disable-line import/no-extraneous-dependencies

import { conversations } from '@/services/__fixtures__/conversations'
import { getConversations } from './conversations'

const server = setupServer(
  rest.get('/conversations/:id', (req, res, ctx) => res(ctx.json(conversations[0]))),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Service User', () => {
  it('should return conversations', async () => {
    const fetchedConversations = await getConversations('1')
    expect(fetchedConversations).toEqual(conversations[0])
  })

  it('should throw error', async () => {
    server.use(
      rest.get('/conversations', (req, res, ctx) => res(ctx.status(500))),
    )

    try {
      const res = await getConversations('1')
      expect(res).toBeTruthy() // should not be reached, if so, test failed
    } catch (e) {
      expect(e).toBeTruthy()
    }
  })
})
