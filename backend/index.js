import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()
const app = express()

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

const DB_URL = process.env.DB_URL
const PORT = process.env.PORT

app.listen(PORT,()=>console.log(`Server is running on PORT:${PORT}`))

mongoose.connect(DB_URL)
.then(()=>console.log("DB connected"))
.catch((error) => console.log("Error in DB connection"))