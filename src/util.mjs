import { readFileSync } from 'fs'

/**
 * Get the input for a specific day
 * @param {number} year
 * @param {number} day
 */
export function getInput(day, year = 2022) {
    const input = readFileSync(`./inputs/day-${day}-${year}.txt`, 'utf8')

    return input.trimEnd()
}
