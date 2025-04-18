import express from "express"
import connectDB from "./db/connect.db.js"
import dotenv from "dotenv"
import router from "./routes/todo.routes.js"
import cors from "cors"

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

connectDB();

app.use("/api/todos",router)


const PORT = process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log(`The server is listning on PORT http://localhost:${PORT }`);
})
