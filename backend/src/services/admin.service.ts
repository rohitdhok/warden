import { pool } from "../config/database.js";
import { AppError } from "../errors/app.error.js";
import { generateAccessToken } from "../utils/jwt.js";
import { hashPassword, verifyPassword } from "../utils/password.js";

export async function registerAdmin(username:string, email:string, password:string) {
    try {
        const hashedPassword = await hashPassword(password);

        const admin = ( await pool.query("INSERT INTO admins(username, email, password_hash) VALUES($1, $2, $3) RETURNING id, username, email, created_at", [username, email, hashedPassword])).rows[0]
        return {admin};
    } catch(err) {
        throw new Error("failed to register new admin: ", {cause: err});
    }
}

export async function findByEmail(email: string) {
    const admin = (await pool.query("SELECT id, username, email, password_hash FROM admins WHERE email=$1", [email])).rows[0];

    if (!admin) {return null};
        
    return admin;
}

export async function loginAdmin(email:string, password:string) {
    const admin = await findByEmail(email);
    if (!admin) {throw new AppError("Invalid email or password", 401)}

    const passwordVerifyResult = await verifyPassword(password, admin.password_hash);

    if (!passwordVerifyResult) {throw new AppError("Invalid email or password", 401)}

    const jwt_token = generateAccessToken(admin.id);
    return {
        admin: {
            id: admin.id,
            username: admin.username,
            email: admin.email,
        },
        accessToken: jwt_token
    }
}