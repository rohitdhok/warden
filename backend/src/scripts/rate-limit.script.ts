export const rateLimitScript = `
local current = redis.call("GET", KEYS[1])

if not current then
    redis.call("SET", KEYS[1], 1, "EX", ARGV[2])
    return 1
end

if tonumber(current) >= tonumber(ARGV[1]) then
    return 0
end

redis.call("INCR", KEYS[1])
return 1
`;