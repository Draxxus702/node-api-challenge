const express= require('express')
const actionRouter = require('./routes/actionRouter')
const projectRouter = require('./routes/projectRouter')
const server = express()

server.use(express.json())

server.use('/api/actions', actionRouter)
server.use('/api/projects', projectRouter)
server.use(logger)

server.get('/', (req, res) => {
    res.send('Sever is running')
})



function logger(req, res, next) {
    const method = req.method
    const endpoint = req.originalURL
    const time = Date.now()
  
  
    console.log(`${method} to ${endpoint} at ${time}`)
    next()
  }
  
  module.exports = server;
  