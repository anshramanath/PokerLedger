import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import playerRoutes from "./routes/players.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5005

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

mongoose.connect(process.env.MDB_URI)
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err))

app.use('/api/players', playerRoutes)

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
})