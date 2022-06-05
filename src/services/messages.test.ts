import { rest } from 'msw' // eslint-disable-line import/no-extraneous-dependencies
import { setupServer } from 'msw/node' // eslint-disable-line import/no-extraneous-dependencies

import { messages } from '@/services/__fixtures__/messages'
import { getMessages, postMessage } from './messages'

const server = setupServer(
  rest.get('/messages/:id', (req, res, ctx) => res(ctx.json(messages[0]))),
  rest.post('/messages/:id', (req, res, ctx) => res(ctx.json(req.body))),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Service User', () => {
  describe('getMessages', () => {
    it('should return messages', async () => {
      const fetchedConversations = await getMessages('1')
      expect(fetchedConversations).toEqual(messages[0])
    })

    it('should throw error', async () => {
      server.use(
        rest.get('/messages', (req, res, ctx) => res(ctx.status(500))),
      )

      try {
        await getMessages('1')
        expect(true).toBe(false) // should not be reached, if so, test failed
      } catch (e) {
        expect(e).toBeTruthy()
      }
    })
  })

  describe('postMessage', () => {
    it('should send message correctly', async () => {
      const reqBody = await postMessage(1, 'Kamoulox', 2)
      const expected = {
        body: 'Kamoulox',
        timestamp: expect.any(Number),
        authorId: 2,
        conversationId: 1,
      }
      expect(reqBody).toEqual(expected)
    })
  })
})
