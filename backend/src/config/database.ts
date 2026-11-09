import { Pool } from "pg";
import "dotenv/config"

export const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT ?? 5432),
    database: process.env.DB_NAME
})

pool.on("error", (err) => {
    console.log("Unexpected PostgreSQL pool error: ", err)
    return;
})

