import { getInput } from "./util.mjs"
import Heapify from "heapify"

const grid = getInput(15)
    .split("\n")
    .map((row) => row.split("").map(Number))

const get = (x, y) => grid[y][x]

const getNeighbors = (x, y) => {
    const n = []

    if (x > 0) n.push([x - 1, y])
    if (x < grid[0].length - 1) n.push([x + 1, y])
    if (y > 0) n.push([x, y - 1])
    if (y < grid.length - 1) n.push([x, y + 1])

    return n
}

function findPath(x, y) {
    const visited = new Set()
    const queue = new Heapify()

    queue.push({ x, y, risk: 0 }, 0)

    while (queue.size) {
        const node = queue.pop()

        console.log(node)

        visited.add(`${node.x},${node.y}`)

        // console.log(
        //     Object.entries(node)
        //         .flat()
        //         .map((item) => `${item}`.padStart(4))
        //         .join(" ")
        // )

        // Is this the last node?
        if (node.x === grid[0].length - 1 && node.y === grid.length - 1) {
            return node.risk
        }

        const neighbors = getNeighbors(node.x, node.y)

        for (const neighbor of neighbors) {
            const [nx, ny] = neighbor
            const risk = node.risk + get(nx, ny)

            if (visited.has(`${nx},${ny}`)) continue

            // distance from end
            const priority =
                Math.abs(nx - grid[0].length - 1) +
                Math.abs(ny - grid.length - 1)

            console.log(risk + priority)

            queue.push({ x: nx, y: ny, risk }, risk + priority)
        }
    }
}

console.log("Part 1", findPath(0, 0))

// Part 2

// Wrap
const wrap = (n) => ((n - 1) % 9) + 1

let newGrid = []

for (let k = 0; k < 5; k++) {
    for (const row of grid) {
        const arr = Array(5)
            .fill(0)
            .flatMap((_, i) => row.map((j) => j + i + k).map(wrap))

        newGrid.push(arr)
    }
}
