const util = require('../util')
const _ = require('lodash')

let input = util.get_input(3)

let grid = util.infinite_grid()

// Part 1
let [x, y] = [0, 0]

// Starting house
grid.set(1, 0, 0)

for (const dir of input) {
    switch (dir) {
        case '^':
            y++
            break
        case 'v':
            y--
            break
        case '>':
            x++
            break
        case '<':
            x--
            break
        default:
            throw new Error(`Unknown direction ${dir}`)
    }

    grid.set(grid.get(x, y) + 1, x, y)
}

console.log(
    'Part 1',
    grid.sum((value) => (value > 0 ? 1 : 0))
)

// Part 2
grid = util.infinite_grid()

let [x1, y1] = [0, 0]
let [x2, y2] = [0, 0]

// Starting house
grid.set(2, 0, 0)

for (const i in input) {
    const dir = input[i]

    switch (dir) {
        case '^':
            if (i % 2 === 0) y1++
            else y2++
            break
        case 'v':
            if (i % 2 === 0) y1--
            else y2--
            break
        case '>':
            if (i % 2 === 0) x1++
            else x2++
            break
        case '<':
            if (i % 2 === 0) x1--
            else x2--
            break
        default:
            throw new Error(`Unknown direction ${dir}`)
    }

    if (i % 2 === 0) {
        grid.set(grid.get(x1, y1) + 1, x1, y1)
    } else {
        grid.set(grid.get(x2, y2) + 1, x2, y2)
    }
}

console.log(
    'Part 2',
    grid.sum((value) => (value > 0 ? 1 : 0))
)
