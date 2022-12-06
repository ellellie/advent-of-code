import { getInput } from './util'
import { sum } from "lodash"

// Part 1
{
    const input = getInput(1).split('\n').map(Number)
    let curr = input.shift()
    let part1 = 0

    while (curr !== undefined) {
        if (input[0] > curr)
            part1++
        curr = input.shift()
    }

    console.log("Part 1", part1)
}

// Part 2
{
    const input = getInput(1).split('\n').map(Number)
    let part2 = 0

    let window = input.splice(0, 3)

    while (input.length) {
        const prev_sum = sum(window)
        window.shift()
        window.push(input.shift()!)

        const next_sum = sum(window)

        if (next_sum > prev_sum)
            part2++
    }

    console.log("Part 2", part2)
}
