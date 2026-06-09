const express = require("express")
const cookieParser= require("cookie-parser")
const cors = require("cors")



const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
const allowedOrigins = [
    "http://localhost:5173",
    "https://crackinterviewai.netlify.app",
    "https://ai-powered-interview-preparations.netlify.app"
]

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true
}))
// require all the routes here 
const authRouter = require("./routes/auth.routes.js")
const interviewRouter= require("./routes/interview.routes.js")





//using the all routes here
app.use("/api/auth",authRouter)

app.use("/api/interview",interviewRouter)
module.exports=app
