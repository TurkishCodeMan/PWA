import {setupServer} from 'msw/node'
import {handlers} from './server-handler'

const fullUrl = new URL('http://localhost:3000/api')


const server = setupServer(...handlers)

export * from 'msw'
export {server}
