import { input, password } from "@inquirer/prompts";
import { registerAdmin } from "../services/admin.service.js";
import { pool } from "../config/database.js";

async function main() {
    try {
        const username = await input({message: "Admin Username : ", validate: (value) => value.trim().length >= 3 || "Username must be atleast 3 characters long"})
        const email = await input({message: "Admin Email : ", validate: (value) => value.trim().length > 0 || "Email is required"})
        const adminPassword = await password({message: "Admin Password : ", validate: (value) => value.length > 0 || "Password is required"})

        const admin = await registerAdmin(username.trim(), email.trim(), adminPassword);
        console.log("Admin created successfully: \n", admin)
    } catch(err) {
        console.error("admin provisioning failed: ", err)
    } finally {
        await pool.end();
    }

}

main();