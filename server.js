import { fastify } from 'fastify'

import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const path = require('path')

import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
//import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()

//const database = new DatabaseMemory()

const database = new DatabasePostgres()

// POST localhost:3333/videos
// PUT localhost:3333/videos/1

server.post('/videos', async (request, reply) => {
  const { title, description, duration } = request.body

  await database.create({
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

const fastifyStatic = require('@fastify/static')

server.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
  prefix: '/public/',
  constraints: { host: 'example.com' },
})

server.get('/', (req, reply) => {
  reply.sendFile('index.html')
})

server.get('/videos', async (request) => {
  const search = request.query.search

  //console.log(search)
  const videos = await database.list(search)
  //console.log(videos)
  return videos
})

// Route Parameters

server.put('/videos/:id', async (request, reply) => {
  const videoid = request.params.id
  const { title, description, duration } = request.body

  await database.update(videoid, {
    title,
    description,
    duration,
  })
  return reply.status(204).send()
})

server.delete('/videos/:id', async (request, reply) => {
  const videoid = request.params.id

  await database.delete(videoid)

  return reply.status(204).send()
})

server.listen({
  host: '0.0.0.0',
  port: process.env.POST ?? 3333,
})
