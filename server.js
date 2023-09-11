import { fastify } from 'fastify'
import cors from '@fastify/cors'
import { createRequire } from 'module'
import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'
import { dirname } from 'path'
import * as url from 'url'
import { fileURLToPath } from 'url'

const require = createRequire(import.meta.url)

//import path from 'path'
//import module from 'path'

//import * as path from 'node:path'
const path = require('node:path') //dont work
//console.log(path)
//import * as path from 'path'  //dont work

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const server = fastify()

//set DataBase
//const database = new DatabaseMemory()
const database = new DatabasePostgres()

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

server.get('/videos', async (request, reply) => {
  reply.header('Access-Control-Allow-Origin', '*')
  reply.header('Access-Control-Allow-Methods', 'GET')
  reply.header('Access-Control-Allow-Headers', '*')

  reply.setHeader('Access-Control-Allow-Origin', '*')
  reply.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET')

  const search = request.query.search

  //console.log(search)
  const videos = await database.list(search)
  console.log(videos)
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
