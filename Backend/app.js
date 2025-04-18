import express from "express"
import connectDB from "./db/connect.db.js"
import dotenv from "dotenv"
import router from "./routes/todo.routes.js"
import cors from "cors"

dotenv.config()
const app = express()


app.use(cors({
    origin: ["http://127.0.0.1:5500","http://localhost:5000"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}));
app.use(express.json())
app.use(express.static('public'))

connectDB();

app.use("/api/todos",router)


const PORT = process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log(`The server is listning on PORT http://localhost:${PORT }`);
})
