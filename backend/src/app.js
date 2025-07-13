import express from "express"
import cors from "cors"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,   
    credentials: true
}))

app.use(express.json({limit: "16kb"}))   //etna hi json data bhej sakte hn ekbaar main
app.use(express.urlencoded({extended: true, limit: "16kb"}))   // koe bhi url se  data dene ke liye ye likhte hn
app.use(express.static("public"))

export { app }