import {Client} from "pg"

const client = new Client({
    connectionString : "postgresql://neondb_owner:npg_RGBeaZtD9p6V@ep-falling-pond-aqf5k59r-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
})

export default client