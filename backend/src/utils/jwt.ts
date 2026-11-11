import jwt from "jsonwebtoken";
import "dotenv/config"

export function generateAccessToken(adminId:string) {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {throw new Error("JWT_SECRET is missing")}

    return jwt.sign({adminId}, JWT_SECRET, {expiresIn: "15m"})
}

export function verifyAccessToken(token:string) {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {throw new Error("JWT_SECRET is missing")}

    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded !== "object" || decoded === null || !("adminId" in decoded) || typeof decoded.adminId !== "string") {throw new Error("invalid jwt token")};

    return decoded;
}

export function extractToken(authHeader: string | undefined) {
    if (!(authHeader?.startsWith("Bearer "))) {
        return null
    }

    const token = authHeader.split(" ")[1]?.trim();
    
    if (!token) { return null}
    return token;
}