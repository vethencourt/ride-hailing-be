import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './router/index.js'
import { connectDB } from './config/db.js'

dotenv.config()

const app = express()
const PORT = process.env['PORT'] || 8000
const allowedOrigins = process.env['ALLOWED_ORIGINS']
  ? process.env['ALLOWED_ORIGINS'].split(',')
  : []

connectDB()

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true)

      if (allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        console.error(`CORS blocked for origin: ${origin}`)
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
)

app.use(express.json())
app.use('/api', router)

app.listen(PORT, () => console.log(`live at ${PORT}`))
