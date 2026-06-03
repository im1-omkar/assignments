import * as z from "zod"

describe("Signup Validation", () => {

    const signupSchema = z.object({
        username: z.string().email(),
        password: z.string().min(5),
        firstname: z.string().min(1),
        lastname: z.string().min(1)
    })

    test("valid signup data should pass", () => {

        const result = signupSchema.safeParse({
            username: "omkar@gmail.com",
            password: "12345",
            firstname: "Omkar",
            lastname: "Patil"
        })

        expect(result.success).toBe(true)

    })

    test("invalid email should fail", () => {

        const result = signupSchema.safeParse({
            username: "wrong-email",
            password: "12345",
            firstname: "Omkar",
            lastname: "Patil"
        })

        expect(result.success).toBe(false)

    })

    test("short password should fail", () => {

        const result = signupSchema.safeParse({
            username: "omkar@gmail.com",
            password: "12",
            firstname: "Omkar",
            lastname: "Patil"
        })

        expect(result.success).toBe(false)

    })

})