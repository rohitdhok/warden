import "dotenv/config"

export function validatePort(value : string | undefined) : number {
    const port = Number(value);

    if (Number.isNaN(port) || port < 1 || port > 65535 || !Number.isInteger(port)) {
        throw new Error("port must be an integer in range 1 - 65535.")
    } 

    return port
}

export const PORT = validatePort(process.env.PORT ?? "3000");