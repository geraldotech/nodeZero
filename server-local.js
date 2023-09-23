import { fastify } from 'fastify'
import { createRequire } from 'module'
import { DatabaseMemory } from './database-memory.js'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const require = createRequire(import.meta.url)
const path = require('path')
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const server = fastify()
const database = new DatabaseMemory()

// Static files
const fastifyStatic = require('@fastify/static')
server.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
  prefix: '/public/',
  constraints: { host: '' },
})

server.get('/', (req, reply) => {
  reply.sendFile('index.html')
})

server.post('/videos', (request, reply) => {
  const { title, description, duration } = request.body

  database.create({
    /*  title: title,
    description: description,
    duration: duration, */
    title,
    description,
    duration,
  })

  //console.log(database.list())
  return reply.status(201).send()
})

server.get('/videos', (request, reply) => {
  const videos = database.list()
  console.log(videos)
  return videos
})

// Route Parameters

server.put('/videos/:id', (request, reply) => {
  const videoid = request.params.id
  const { title, description, duration } = request.body

  database.update(videoid, {
    title,
    description,
    duration,
  })
  return reply.status(204).send()
})

server.delete('/videos/:id', (request, reply) => {
  const videoid = request.params.id

  database.delete(videoid)

  return reply.status(204).send()
})

server.listen({
  port: 3333,
})
