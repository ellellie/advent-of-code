const util = require("./util")
const _ = require("lodash")

let grid = util
    .getInput(11)
    .split("\n")
    .map((line) => line.split("").map(Number))

const get = (x, y) => [x, y]

const getNeighbors = (x, y) => {
    const n = []
    if (x > 0) n.push(get(x - 1, y))
    if (x < grid[0].length - 1) n.push(get(x + 1, y))
    if (y > 0) n.push(get(x, y - 1))
    if (y < grid.length - 1) n.push(get(x, y + 1))
    // And diagonals
    if (x > 0 && y > 0) n.push(get(x - 1, y - 1))
    if (x < grid[0].length - 1 && y > 0) n.push(get(x + 1, y - 1))
    if (x > 0 && y < grid.length - 1) n.push(get(x - 1, y + 1))
    if (x < grid[0].length - 1 && y < grid.length - 1) n.push(get(x + 1, y + 1))

    return n
}

const step = () => {
    let flashed = []

    // First, the value of each octopus increases by one.
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            grid[y][x]++
            if (grid[y][x] > 9) {
                flashed.push([x, y])
            }
        }
    }

    let totalFlashed = 0

    while (flashed.length) {
        const [x, y] = flashed.pop()
        if (grid[y][x] === 0) continue

        totalFlashed++
        grid[y][x] = 0

        const neighbors = getNeighbors(x, y)

        for (const [x, y] of neighbors) {
            // Skip already flashed cells.
            if (grid[y][x] === 0) continue

            grid[y][x]++

            if (grid[y][x] > 9) {
                flashed.push([x, y])
            }
        }
    }

    return totalFlashed
}

const printGrid = (step) => {
    console.log(`\nAfter ${step} steps:`)
    grid.forEach((line) => {
        console.log(line.map((x) => x.toString()).join(""))
    })
}

// let total = 0

// for (let i = 0; i < 100; i++) {
//     printGrid(i)
//     total += step()
// }

// console.log("Part 1", total)

let i = 0
while (true) {
    const total = step()
    i++
    if (total === 100) {
        console.log(i)
        break
    }
}
