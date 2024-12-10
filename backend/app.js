import express from "express";
const server = express()
// import connection from './database/connection.js'
import moviesRouter from './routes/movies.js'


server.use(express.json())

const HOST = process.env.HOST || "http://localhost"
const PORT = process.env.PORT || 3000 || 3001 || 3002

server.listen(PORT, ()=> console.log(`Server listening on ${HOST}:${PORT}`))

server.use('/', moviesRouter)