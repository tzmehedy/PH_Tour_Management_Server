import dotenv from "dotenv"

dotenv.config()

export const envVars = {
    DATABASE_URL : process.env.DATABASE_URL,
    PORT: process.env.PORT,
    NODE_DEV: process.env.NODE_DEV,
    ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY
}