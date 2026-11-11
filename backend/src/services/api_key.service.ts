import { pool } from "../config/database.js";
import { hashApiKey } from "../utils/api-key.js";

export async function fetchByApiKey(rawApiKey: string) {
    try {
        const hashedKey = hashApiKey(rawApiKey);

        const client = ( await pool.query("SELECT id, client_id, api_key_hash, is_active FROM api_keys WHERE api_key_hash=$1", [hashedKey])).rows[0]

        if (!client || client.is_active == false) { return null }
        
        return client;

    } catch(err) {
        throw new Error("failed to fetch by raw API key: ", {cause: err})
    }
}

export async function revokeApiKey(apiKeyId: string) {
    try {
        const api_key = ( await pool.query("UPDATE api_keys SET is_active = FALSE WHERE id=$1 RETURNING *", [apiKeyId])).rows[0];
        return api_key ?? null;
    } catch(err) {
        throw new Error("failed to revoke API key: ", {cause: err})
    }
}

revokeApiKey("3");