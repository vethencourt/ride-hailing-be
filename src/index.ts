import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './router/index.js'
import { connectDB } from './config/db.js'

dotenv.config()

const app = express()
const PORT = process.env['PORT'] || 8000

connectDB()
app.use(cors())
app.use(express.json())
app.use('/api', router)

app.listen(PORT, () => console.log(`live at ${PORT}`))
