import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './router/index.js'

dotenv.config()

const app = express()
const PORT = 8000

app.use(cors())
app.use(express.json())
app.use('/api', router)

app.listen(PORT, () => console.log(`live at ${PORT}`))
