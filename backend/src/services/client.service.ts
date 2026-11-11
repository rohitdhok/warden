import { pool } from "../config/database.js";
import { generateApiKey } from "../utils/api-key.js";
import { hashApiKey } from "../utils/api-key.js";

export async function registerClient(name: string) {
    const client = await pool.connect();
    const api_key = generateApiKey();
    const hashed_api_key = hashApiKey(api_key);

    try {
        await client.query("BEGIN");
        const client_record = (await client.query("INSERT INTO clients (name) VALUES($1) RETURNING *", [name])).rows[0]
        await client.query("INSERT INTO api_keys (api_key_hash, client_id) VALUES ($1, $2)", [hashed_api_key, client_record.id]);
        await client.query("COMMIT");

        return {success: true,client: client_record, api_key};
    } catch(err) {
        try {
            await client.query("ROLLBACK"); 
        } catch(rollbackError) {
            console.error("Rollback failed: ", rollbackError)
        }

        throw new Error("failed to register client: ", {cause: err})
    } finally {
        client.release();
    }
}