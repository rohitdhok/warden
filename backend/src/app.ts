import express from "express"

import { routeNotFound } from "./middlewares/not-found.middleware.js"
import { handleError } from "./middlewares/error.middleware.js"
import { validateApiKey } from "./middlewares/api-key.middleware.js"
import { handleRateLimit } from "./middlewares/rate-limit.middleware.js"

import { healthRoutes } from "./routes/healthRoutes.js"
import { clientRoutes } from "./routes/client.routes.js"
import { adminRoutes } from "./routes/admin.routes.js"

const app = express()


app.use(express.json())
app.use("/health", healthRoutes)
app.use("/admin", clientRoutes)
app.use("/admin", adminRoutes)
app.get("/protected", validateApiKey(), handleRateLimit(), (req, res) => {
    return res.json({message: `access granted ${req.clientId ?? null}`})
})
app.use(routeNotFound)
app.use(handleError)

export {app}