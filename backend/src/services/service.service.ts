import { pool } from "../config/database.js";
import { updateServiceSchema } from "../schemas/service.schema.js";

export async function createService(name:string, base_url:string) {
    return (await pool.query("INSERT INTO services(name, base_url) VALUES($1, $2) RETURNING *", [name, base_url])).rows[0]
}

export async function getAllServices() {
    return (await pool.query("SELECT * FROM services")).rows
}

export async function getServiceById(serviceId:string) {
    return (await pool.query("SELECT * FROM services WHERE id=$1", [serviceId])).rows[0] ?? null;
}

export async function updateService(serviceId:string, name?:string, base_url?:string) {
    return (await pool.query("UPDATE services SET name=COALESCE($1, name), base_url=COALESCE($2, base_url), updated_at=NOW() WHERE id=$3 RETURNING *", [name, base_url, serviceId])).rows[0] ?? null;
}

export async function deleteService(serviceId:string) {
    return (await pool.query("DELETE FROM services WHERE id=$1 RETURNING *", [serviceId])).rows[0] ?? null;
}