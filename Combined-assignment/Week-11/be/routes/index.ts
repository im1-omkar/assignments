import express from "express"
import userRouter from "./user"
import accountRouter from "./account"
import cors from "cors";

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/v1/user',userRouter)

app.use('/api/v1/account',accountRouter)

export default app
