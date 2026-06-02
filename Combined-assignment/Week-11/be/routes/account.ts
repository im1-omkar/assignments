import express from "express"
import { client } from "../db"
import middleware from "../middleware"

const accountRouter = express.Router()

// GET BALANCE
accountRouter.get(
  "/balance",
  middleware.protectedValidator,
  async (req: any, res: express.Response) => {
    try {
      const username = req.user.username

      // get user
      const userResult = await client.query(
        `
        SELECT id
        FROM users
        WHERE user_name = $1
        `,
        [username]
      )

      if (userResult.rows.length === 0) {
        return res.status(404).json({
          message: "User not found"
        })
      }

      const userId = userResult.rows[0].id

      // get balance
      const balanceResult = await client.query(
        `
        SELECT balance
        FROM accounts
        WHERE user_id = $1
        `,
        [userId]
      )

      if (balanceResult.rows.length === 0) {
        return res.status(404).json({
          message: "Account not found"
        })
      }

      return res.status(200).json({
        balance: balanceResult.rows[0].balance
      })
    } catch (err) {
      console.log(err)

      return res.status(500).json({
        message: "Internal server error"
      })
    }
  }
)

// TRANSFER MONEY
accountRouter.post(
  "/transfer",
  middleware.protectedValidator,
  middleware.transferValidator,
  async (req: any, res: express.Response) => {
    const senderUsername = req.user.username

    const { amount, toTransfer } = req.body

    try {
      await client.query("BEGIN")

      // sender
      const senderResult = await client.query(
        `
        SELECT u.id, a.balance
        FROM users u
        JOIN accounts a
        ON u.id = a.user_id
        WHERE u.user_name = $1
        `,
        [senderUsername]
      )

      if (senderResult.rows.length === 0) {
        await client.query("ROLLBACK")

        return res.status(404).json({
          message: "Sender account not found"
        })
      }

      const sender = senderResult.rows[0]

      // receiver
      const receiverResult = await client.query(
        `
        SELECT u.id, a.balance
        FROM users u
        JOIN accounts a
        ON u.id = a.user_id
        WHERE u.user_name = $1
        `,
        [toTransfer]
      )

      if (receiverResult.rows.length === 0) {
        await client.query("ROLLBACK")

        return res.status(404).json({
          message: "Receiver account not found"
        })
      }

      const receiver = receiverResult.rows[0]

      // self transfer check
      if (sender.id === receiver.id) {
        await client.query("ROLLBACK")

        return res.status(400).json({
          message: "Cannot transfer to yourself"
        })
      }

      // insufficient balance
      if (Number(sender.balance) < Number(amount)) {
        await client.query("ROLLBACK")

        return res.status(400).json({
          message: "Insufficient balance"
        })
      }

      // deduct sender balance
      await client.query(
        `
        UPDATE accounts
        SET balance = balance - $1
        WHERE user_id = $2
        `,
        [amount, sender.id]
      )

      // add receiver balance
      await client.query(
        `
        UPDATE accounts
        SET balance = balance + $1
        WHERE user_id = $2
        `,
        [amount, receiver.id]
      )

      await client.query("COMMIT")

      return res.status(200).json({
        message: "Transfer successful"
      })
    } catch (err) {
      await client.query("ROLLBACK")

      console.log(err)

      return res.status(500).json({
        message: "Internal server error"
      })
    }
  }
)

export default accountRouter