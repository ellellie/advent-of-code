import fs from "fs"

export const getInput = (day) => {
    const data = fs.readFileSync(`./inputs/day-${day}.txt`, "utf8")
    return data.trim() // Trim leading and following newlines
}

export const hash = (data) =>
    crypto.createHash("md5").update(data).digest("hex")
