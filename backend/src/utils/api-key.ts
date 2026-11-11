import { randomBytes } from "node:crypto";
import { createHash } from "node:crypto";

export function generateApiKey() {
    return `warden_${randomBytes(32).toString("hex")}`
}

export function hashApiKey(apiKey: string) {
    return createHash("sha256").update(apiKey).digest("hex");
}
