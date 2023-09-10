/* import { createServer } from 'node:http'

const server = createServer((resquest, response) => {
  console.log(`Hello`)

  response.write('Oi 2')
  return response.end()
})

server.listen(3333)
 */
import { fastify } from 'fastify'

const server = fastify()

server.get('/', () => {
  return 'Hello World'
})

server.get('/hello', () => {
  return 'Hello gmapdev'
})

server.get('/node', () => {
  return 'Hello gmapdev'
})

//works but is out of date: server.listen(3333)

//new way:
server.listen({
  port: 3333,
})
