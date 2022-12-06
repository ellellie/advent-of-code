import { getInput } from "./util";

const instructions = getInput(2).split('\n').map(row => {
    const [method, amount] = row.split(' ')
    return { method, amount: Number(amount) }
})

// Part 1
{
    let horz = 0
    let depth = 0

    for (const { method, amount } of instructions) {
        if (method === "down") depth += amount
        if (method === "up") depth -= amount
        if (method === "forward") horz += amount
    }

    console.log("Part 1", horz * depth)
}

// Part 2
{
    let horz = 0
    let depth = 0

    let aim = 0

    for (const { method, amount } of instructions) {
        if (method === "down") aim += amount
        if (method === "up") aim -= amount
        if (method === "forward") {
            horz += amount
            depth += amount * aim
        }
    }

    console.log("Part 2", horz * depth)
}