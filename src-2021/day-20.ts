import { getInput } from "./util";
import _ from 'lodash'

const [enhancement, gridStr] = getInput(20).split("\n\n")

type Grid = { [key: string]: '#' | '.' }
const grid: Grid = {}

// Fuck it. 2000 x 2000 grid from (-1000,-1000) to (1000, 1000)
for (let x = -300; x <= 300; x++) {
    for (let y = -300; y <= 300; y++) {
        grid[`${x},${y}`] = '.'
    }
}

// Load the grid.
gridStr.split('\n')
    .forEach((row, y) => {
        row.split('')
            .forEach((cell, x) => {
                grid[`${x},${y}`] = cell as '#' | '.'
            })
    })

const print_grid = (grid: Grid) => {
    // Pretty-print the grid.
    const min_x = Math.min(...Object.keys(grid).map(key => parseInt(key.split(',')[0])))
    const max_x = Math.max(...Object.keys(grid).map(key => parseInt(key.split(',')[0])))
    const min_y = Math.min(...Object.keys(grid).map(key => parseInt(key.split(',')[1])))
    const max_y = Math.max(...Object.keys(grid).map(key => parseInt(key.split(',')[1])))

    for (let y = min_y; y <= max_y; y++) {
        let row = ''
        for (let x = min_x; x <= max_x; x++) {
            row += grid[`${x},${y}`]
        }
        console.log(row)
    }
}

const get = (grid: Grid, x: number, y: number, step: number) => grid[`${x},${y}`] || (step === 0 ? '.' : (step % 2 === 0 ? enhancement[enhancement.length - 1] : enhancement[0]))

const get_neighbors = (grid: Grid, x: number, y: number): Array<[x: number, y: number]> => {
    const n: [number, number][] = []
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            n.push([x + j, y + i])
        }
    }

    return n
}

const step = (grid: Grid, step: number): Grid => {
    const new_grid: Grid = {}

    // For each cell, determine it's next state.
    const point_coords = Object.keys(grid).map(key => key.split(',').map(Number))

    // // Get all neighbors for each point, and union them.
    // const all_points = _.uniqBy(point_coords.flatMap(coords => {
    //     const x = coords[0]
    //     const y = coords[1]
    //     return get_neighbors(grid, x, y)
    // }), ([x, y]) => `${x},${y}`)

    // For each point, get it's neighbors.
    for (const point of point_coords) {
        const [x, y] = point

        // Get the neighbors.
        const neighbors = get_neighbors(grid, x, y)

        // Turn this into a binary string.
        const index = parseInt(
            neighbors.map(([x, y]) => get(grid, x, y, step))
                .map(cell => cell === '#' ? '1' : '0')
                .join('')
            , 2)

        new_grid[`${x},${y}`] = enhancement[index] as '#' | '.'
    }

    return new_grid
}

const final_grid = step(step(grid, 0), 1)
// print_grid(final_grid)
console.log("Part 1", Object.values(final_grid).filter(cell => cell === '#').length)

// console.log(get_neighbors(grid, 2, 2).map(([x, y]) => get(grid, x, y)).join(''))

let new_grid = _.cloneDeep(grid)
for (let i = 0; i < 50; i++) {
    // Iterate 50 times.
    new_grid = step(new_grid, i)

    console.log(`${i} / 50`)
}

// Rip out the outermost border of the grid.
const best_keys = Object.keys(new_grid)
    .map(key => key.split(',').map(Number))
    .filter(([x, y]) =>
        x > -200 && x < 200 && y > -200 && y < 200
    )

// console.log(best_keys)

console.log("Part 2", best_keys.filter(([x, y]) => get(new_grid, x, y, 50) === '#').length)
