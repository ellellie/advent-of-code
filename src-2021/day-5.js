const util = require("./util")
const _ = require("lodash")

const input = util
    .getInput(5)
    .split("\n")
    .map((line) => line.split(" -> ").map((d) => d.split(",").map((c) => +c)))

const grid = {}

const increment = (x, y) => (grid[`${x},${y}`] = grid[`${x},${y}`] ? 2 : 1)

for (const [to, from] of input) {
    if (to[0] == from[0]) {
        // horz
        const low = Math.min(from[1], to[1])
        const high = Math.max(from[1], to[1])
        for (let i = low; i <= high; i++) {
            increment(to[0], i)
        }
    } else if (to[1] == from[1]) {
        // vert
        const low = Math.min(from[0], to[0])
        const high = Math.max(from[0], to[0])
        for (let i = low; i <= high; i++) {
            increment(i, to[1])
        }
    } else {
        const raw = [from[0] - to[0], from[1] - to[1]]
        const vec = raw.map((c) => c / Math.max(...raw.map(Math.abs)))

        for (let i = 0; i <= Math.max(...raw.map(Math.abs)); i++) {
            increment(to[0] + vec[0] * i, to[1] + vec[1] * i)
        }
    }
}

console.log(Object.values(grid).filter((v) => v == 2).length)
