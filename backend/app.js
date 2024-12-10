import express from "express";
const server = express()

const HOST = process.env.HOST || "http://localhost"
const PORT = process.env.PORT || 3000 || 3001 || 3002

server.listen(PORT, ()=> console.log(`Server listening on ${HOST}:${PORT}`))

server.get('/', (req,res) => {
    res.send('Server is working')
})