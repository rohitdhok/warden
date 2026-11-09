import { readdir } from "node:fs/promises";
import { readFile } from "node:fs/promises";
import { pool } from "../config/database.js";
import { fileURLToPath } from "node:url";

const migrationDirPath = fileURLToPath(
  new URL("../../migrations", import.meta.url)
);

async function initializeMigrationTable() {
    try {
        const sql_query = `
        CREATE TABLE IF NOT EXISTS schema_migrations (
            filename TEXT PRIMARY KEY,
            executed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
        `
        await pool.query(sql_query);
        console.log("Schema Migrations table created successfully.")
    } catch(err) {
        throw new Error("Error while creating Schema Migrations table: ", {cause: err});
    }
}

async function getExecutedMigrations() {
    return (await pool.query("SELECT filename FROM schema_migrations")).rows.map(record => record.filename);
}

async function executeMigration(filename: string, sql: string) {
    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        await client.query(sql);
        await client.query("INSERT INTO schema_migrations(filename) VALUES($1)", [filename]);
        await client.query("COMMIT");
    } catch(err) {
        try {
            await client.query("ROLLBACK");
        } catch (rollbackError) {
            console.error("Rollback failed:", rollbackError);
        }

        throw new Error(
            `Failed to execute migration: ${filename}`,
            { cause: err }
        );
    } finally {
        client.release();
    }
}

async function readMigrationFiles() {
    await initializeMigrationTable();
    const files =  (await readdir(migrationDirPath));
    const executedMigrations = await getExecutedMigrations()

    const sortedFiles = [...files].filter(file => file.endsWith(".sql")).sort();

    for (let file of sortedFiles ) {
        if (!executedMigrations.includes(file)) {
            const fileContent = await readFile(`${migrationDirPath}/${file}`, "utf-8");
            await executeMigration(file, fileContent);
            console.log(`+ Successfully executed Migration : ${file}`);
        } else {
            console.log(`- Skipping already executed migration : ${file}`)
        }
    }

    console.log("Migration process completed.")
}

async function main() {
    try {
        await readMigrationFiles();
    } catch (err) {
        console.error("Migration runner failed:", err);
        process.exitCode = 1;
    } finally {
        await pool.end();
    }
}

main();