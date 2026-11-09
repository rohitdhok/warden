import {app} from "./app.js"
import { PORT } from "./config/env.js";
import { connectRedis } from "./config/redis.js";

async function startServer() {
    try {
        await connectRedis();
        console.log("Connected to redis server successfully.")

        app.listen(PORT, () => {
            console.log(`Server listening on http://localhost:${PORT}`);
        })
    } catch(err) {
        console.error(err);
        process.exit(1);
    }
}

startServer();