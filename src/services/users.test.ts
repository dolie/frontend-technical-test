import { rest } from 'msw' // eslint-disable-line import/no-extraneous-dependencies
import { setupServer } from 'msw/node' // eslint-disable-line import/no-extraneous-dependencies

import { users } from '@/services/__fixtures__/users'
import { getUsers, getUser } from './users'

const server = setupServer(
  rest.get('/users', (req, res, ctx) => res(ctx.json(users))),
  rest.get('/users/:id', (req, res, ctx) => res(ctx.json(users.find(u => String(u.id) === req.params.id)))),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Service User', () => {
  it('should return users', async () => {
    const fetchedUsers = await getUsers()
    expect(fetchedUsers).toEqual(users)
  })

  it('should return user by id', async () => {
    const fetchedUser = await getUser('1')
    expect(fetchedUser).toEqual(users[0])
  })

  it('should throw error', async () => {
    server.use(
      rest.get('/users', (req, res, ctx) => res(ctx.status(500))),
    )

    try {
      const res = await getUsers()
      expect(res).toBeTruthy() // should not be reached, if so, test failed
    } catch (e) {
      expect(e).toBeTruthy()
    }
  })
})
