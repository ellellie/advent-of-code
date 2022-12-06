import { readFileSync } from "fs"

export function getInput(day: number): string {
    const input = readFileSync(`inputs/day-${day}.txt`, "utf8")

    return input.trimEnd() // We should strip trailing newlines just in case*
}