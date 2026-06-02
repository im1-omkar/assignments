import express from "express"
import userRouter from "./user"
import accountRouter from "./account"

const app = express()
app.use(express.json())

app.use('/api/v1/user',userRouter)

app.use('api/v1/account',accountRouter)

export default app
