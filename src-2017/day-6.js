const util = require('../util')
const _ = require('lodash')

const LIGHT_REGEX =
    /(?<action>turn on|turn off|toggle) (?<from_x>\d+),(?<from_y>\d+) through (?<to_x>\d+),(?<to_y>\d+)/

let input = util
    .get_input(6)
    .split('\n')
    .map((line) => {
        const {
            groups: { action, from_x, from_y, to_x, to_y },
        } = LIGHT_REGEX.exec(line)

        return {
            action,
            from: [parseInt(from_x), parseInt(from_y)],
            to: [parseInt(to_x), parseInt(to_y)],
        }
    })

let grid = util.infinite_grid({
    default_value: false,
})

for (const { action, from, to } of input) {
    for (let x = from[0]; x <= to[0]; x++) {
        for (let y = from[1]; y <= to[1]; y++) {
            if (action === 'turn on') {
                grid.set(true, x, y)
            } else if (action === 'turn off') {
                grid.set(false, x, y)
            } else {
                grid.set(!grid.get(x, y), x, y)
            }
        }
    }
}

console.log(
    'Part 1',
    grid.sum((value) => (value ? 1 : 0))
)

grid = util.infinite_grid({
    default_value: 0,
})

for (const { action, from, to } of input) {
    for (let x = from[0]; x <= to[0]; x++) {
        for (let y = from[1]; y <= to[1]; y++) {
            if (action === 'turn on') {
                grid.set(grid.get(x, y) + 1, x, y)
            } else if (action === 'turn off') {
                grid.set(Math.max(0, grid.get(x, y) - 1), x, y)
            } else {
                grid.set(grid.get(x, y) + 2, x, y)
            }
        }
    }
}

console.log(
    'Part 2',
    grid.sum((value) => value)
)
