import express from "express"
import * as z from "zod"
import jwt from "jsonwebtoken"

const updateValidator = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const updateObj = z.object({
    firstname: z.string().min(1).max(20).optional(),
    lastname: z.string().min(1).max(20).optional()
  })

  try {
    const data = updateObj.parse(req.body)

    // at least one field required
    if (!data.firstname && !data.lastname) {
      return res.status(400).json({
        message: "At least one field is required"
      })
    }

    next()
  } catch (err) {
    return res.status(400).json({
      message: "Invalid body format"
    })
  }
}

const signInValidator = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const signInObj = z.object({
    username: z.email(),
    password: z.string().min(5)
  })

  try {
    signInObj.parse(req.body)

    next()
  } catch (err) {
    return res.status(400).json({
      message: "Invalid body format"
    })
  }
}

const signUpValidator = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const signUpObj = z.object({
    username: z.email(),
    password: z.string().min(5),
    firstName: z.string().min(1).max(20),
    lastName: z.string().min(1).max(20)
  })

  try {
    signUpObj.parse(req.body)

    next()
  } catch (err) {
    return res.status(400).json({
      message: "Invalid body format"
    })
  }
}

const transferValidator = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const transferObj = z.object({
    toTransfer: z.string().min(1),
    amount: z.number().positive()
  })

  try {
    const data = transferObj.parse(req.body)

    // prevent self transfer
    if (req.body.sender === data.toTransfer) {
      return res.status(400).json({
        message: "Cannot transfer to yourself"
      })
    }

    next()
  } catch (err) {
    return res.status(400).json({
      message: "Invalid body format"
    })
  }
}

const protectedValidator = (
  req: any,
  res: express.Response,
  next: express.NextFunction
) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({
      message: "No token provided"
    })
  }

  const splitted = authHeader.split(" ")

  if (splitted.length !== 2 || splitted[0] !== "Bearer") {
    return res.status(401).json({
      message: "Invalid authorization format"
    })
  }

  const token = splitted[1]

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    )

    req.user = decoded

    next()
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token"
    })
  }
}

const middleware = {
  updateValidator,
  signInValidator,
  signUpValidator,
  transferValidator,
  protectedValidator
}

export default middleware