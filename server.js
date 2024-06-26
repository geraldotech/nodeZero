import { fastify } from 'fastify'
import cors from '@fastify/cors'
import { createRequire } from 'module'
//import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'
import { dirname } from 'path'
import * as url from 'url'
import { fileURLToPath } from 'url'

const require = createRequire(import.meta.url)
const path = require('node:path') //dont work
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

server.get('/status', (req, reply) => {
  reply.header('Access-Control-Allow-Origin', '*')
  reply.header('Access-Control-Allow-Methods', 'GET')
  //res.send('API ok')
  return reply
  .code(200)
  .header('Content-Type', 'application/json; charset=utf-8')
  .send(
    { status: 200, message: 'API running' 
    
    })
})

server.get('/videos', async (request, reply) => {
  reply.header('Access-Control-Allow-Origin', '*')
  reply.header('Access-Control-Allow-Methods', 'GET')
  reply.header('Access-Control-Allow-Headers', '*')

  /*  reply.setHeader('Access-Control-Allow-Origin', '*')
  reply.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET') */

  const search = request.query.search

  //console.log(search)
  const videos = await database.list(search)
  console.log(videos)
  return videos
})
//✅ Router to single posts, just make a find to server obj that is requested, 
//thanks too https://www.sitepoint.com/create-rest-api-fastify/
// openned Access-Control to allow CORS
server.get('/videos/:id', async (request, reply) => {
  reply.header('Access-Control-Allow-Origin', '*')
  reply.header('Access-Control-Allow-Methods', 'GET')
  reply.header('Access-Control-Allow-Headers', '*')
  
  const videoid = request.params.id
  const search = request.query.search

  const videos = await database.list(search)
  const single = videos.find(post => post.id == videoid)
  return single
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

await server.listen({
  host: '0.0.0.0',
  port: process.env.POST ?? 3333,
})


/* always online */
async function getServerStatus(url){
  const req = await fetch(url)
  const data = await req.json()
  console.log(data)
  console.log(new Date())
}

// 30 minutes * 60 seconds * 1000 milliseconds = 1,800,000 milliseconds
// Set the interval to run every 15 minutes
setInterval(() => {  
  console.log(`always online is running`)
  getServerStatus("https://node-do-zerp.onrender.com/status")
}, 750000)
