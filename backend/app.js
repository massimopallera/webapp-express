//📌 Imports
import express from "express";
import moviesRouter from './routes/movies.js'
import cors from 'cors'

//📌 Middleware
import logger from './middleware/logger.js'
// import notFound from './middleware/notFound.js'

const server = express() // create server

const corsOptions = {origin: process.env.WEBAPP_ORIGIN}

server.use(cors(corsOptions))

server.use(express.json())

const HOST = process.env.HOST || "http://localhost"
const PORT = process.env.PORT || 3000 || 3001 || 3002

server.listen(PORT, ()=> console.log(`Server listening on ${HOST}:${PORT}`))

server.use('/', logger)

server.use('/', moviesRouter)