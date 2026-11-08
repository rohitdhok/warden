import express from "express"
import { healthRoutes } from "./routes/healthRoutes.js"
import { routeNotFound } from "./middlewares/not-found.middleware.js"
import { handleError } from "./middlewares/error.middleware.js"

const app = express()


app.use(express.json())
app.use("/health", healthRoutes)
app.use(routeNotFound)
app.use(handleError)

export {app}