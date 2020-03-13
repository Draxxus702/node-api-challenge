const server = require('./server.js')

PORT = 5005

server.listen(PORT, ()=>{
    console.log(`\n ** Server Running on http://localhost:${PORT} **\n`)
})