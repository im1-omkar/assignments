import express from "express"
import jwt from "jsonwebtoken"
import middleware from "../middleware"
import { client } from "../db"

const userRouter = express.Router()

const createAccount = async(userId:number)=>{
  try{
    const result = client.query(`
        INSERT INTO  accounts (user_id, balance) VALUES ($1,$2)
        `,[userId,1000])
  }
  catch(err){
    if(err instanceof Error){
      console.log("error while created a account!")
      console.log(err.message);
      return;
    }
    console.log("error while created a account!")
    return
  }
}

// SIGNUP
userRouter.post(
  "/signup",
  middleware.signUpValidator,
  async (req: express.Request, res: express.Response) => {
    try {
      const { username, password, firstName, lastName } = req.body

      // check existing user
      const existingUser = await client.query(
        `
        SELECT * FROM users
        WHERE user_name = $1
        `,
        [username]
      )

      if (existingUser.rows.length > 0) {
        return res.status(400).json({
          message: "Username already exists",
        })
      }

      // insert user
      const user = await client.query(
        `
        INSERT INTO users
        (user_name, password, first_name, last_name)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
        [username, password, firstName, lastName]
      )

      await createAccount(user.rows[0].id)

      return res.status(201).json({
        message: "User created successfully && account created as well",
      })
    } catch (err) {
      console.log(err)

      return res.status(500).json({
        message: "Internal server error",
      })
    }
  }
)

// SIGNIN
userRouter.post(
  "/signin",
  middleware.signInValidator,
  async (req: express.Request, res: express.Response) => {
    try {

      const { username, password } = req.body

      // find user
      const result = await client.query(
        `
        SELECT * FROM users
        WHERE user_name = $1
        `,
        [username]
      )

      if (result.rows.length === 0) {
        return res.status(401).json({
          message: "Invalid credentials",
        })
      }

      const user = result.rows[0]

      // compare password
      if (password !== user.password) {
        return res.status(401).json({
          message: "Invalid credentials",
        })
      }

      // generate jwt
      const token = jwt.sign(
        {
          username: user.user_name,
          firstName: user.first_name,
          lastName: user.last_name,
        },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "7d",
        }
      )

      return res.status(200).json({
        message: "Signin successful",
        token,
      })
    } catch (err) {
      console.log(err)

      return res.status(500).json({
        message: "Internal server error",
      })
    }
  }
)

// UPDATE USER
userRouter.put(
  "",
  [middleware.protectedValidator,middleware.updateValidator],
  async (req: any, res: express.Response) => {
    try {
      const username = req.username

      const { firstName, lastName } = req.body

      const result = await client.query(
        `
        UPDATE users
        SET first_name = $1,
            last_name = $2
        WHERE user_name = $3
        RETURNING *
        `,
        [firstName, lastName, username]
      )

      console.log(result.rows)

      return res.status(200).json({
        message: "Updated successfully",
        updatedData: result.rows[0],

      })
    } catch (err) {
      console.log(err)

      return res.status(500).json({
        message: "Internal server error",
      })
    }
  }
)

// BULK SEARCH
userRouter.get(
  "/bulk",
  async (req: express.Request, res: express.Response) => {
    try {
      const filter = req.query.filter as string

      if (!filter) {
        return res.status(400).json({
          message: "Filter is required",
        })
      }

      const result = await client.query(
        `
        SELECT
          user_name,
          first_name,
          last_name
        FROM users
        WHERE first_name ILIKE $1
           OR last_name ILIKE $1
        LIMIT 20
        `,
        [`%${filter}%`]
      )

      return res.status(200).json({
        users: result.rows,
      })
    } catch (err) {
      console.log(err)

      return res.status(500).json({
        message: "Internal server error",
      })
    }
  }
)

export default userRouter