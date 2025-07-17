import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,   
    credentials: true
}))

app.use(express.json({limit: "16kb"}))   //etna hi json data bhej sakte hn ekbaar main
app.use(express.urlencoded({extended: true, limit: "16kb"}))   // koe bhi url se  data dene ke liye ye likhte hn
app.use(express.static("public"))
app.use(cookieParser())

//routes import
import userRouter from "./routes/user.routes.js"
import upvoteRouter from "./routes/upvote.routes.js"
import issueRouter from "./routes/issue.routes.js";

//routes decleration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/upvotes", upvoteRouter)
app.use("/api/v1/issues", issueRouter);

// http://localhost:8000/api/v1/users/register-- (example ase bhejna hn)

export { app }