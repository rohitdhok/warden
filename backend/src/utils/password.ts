import bcrypt from "bcrypt"

const cost_factor = 12;

export async function hashPassword(password:string) {
    return await bcrypt.hash(password, cost_factor);
}

export async function verifyPassword(password:string, hashedPassword:string) {
    return await bcrypt.compare(password, hashedPassword);
}