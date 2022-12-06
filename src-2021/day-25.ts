import { getInput } from "./util";

type Grid = Array<Array<'>' | 'v' | '.'>>

let grid = getInput(25).split("\n").map(row => row.split("")) as Grid;
const width = grid[0].length
const height = grid.length

// Get with wraparound
const get = (grid: Grid, x: number, y: number) => grid[y % height][x % width]
const set = (grid: Grid, x: number, y: number, value: '>' | 'v' | '.') => {
    grid[y % height][x % width] = value
}

const make_grid = (): Grid => {
    const grid: Grid = []
    for (let y = 0; y < height; y++) {
        grid.push([])
        for (let x = 0; x < width; x++) {
            grid[y].push('.')
        }
    }
    return grid
}

const move_east = (grid: Grid, total_moves = 0): [Grid, number] => {
    const new_grid = make_grid()

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const value = get(grid, x, y)
            // Does the east neighbor exist?
            if (value === '>' && get(grid, x + 1, y) === '.') {
                set(new_grid, x + 1, y, '>')
                set(new_grid, x, y, '.')

                total_moves++
            } else {
                if (get(new_grid, x, y) === '.')
                    set(new_grid, x, y, value)
            }
        }
    }

    return [new_grid, total_moves]
}

const move_south = (grid: Grid, total_moves = 0): [Grid, number] => {
    const new_grid = make_grid()

    // Foreach column
    for (let x = 0; x < width; x++) {
        // Foreach row
        for (let y = 0; y < height; y++) {
            const value = get(grid, x, y)
            // Does the south neighbor exist?
            if (value === 'v' && get(grid, x, y + 1) === '.') {
                // console.log('South', x, y)
                set(new_grid, x, y + 1, 'v')
                set(new_grid, x, y, '.')

                total_moves++
            } else {
                if (get(new_grid, x, y) === '.')
                    set(new_grid, x, y, value)
            }
        }
    }

    return [new_grid, total_moves]
}

const move = (grid: Grid): [Grid, number] => move_south(...move_east(grid))

let count = -1
let i = 0
while (count !== 0) {
    [grid, count] = move(grid)
    i++
}

console.log('Part 1', i)
console.log('Part 2', 'N/A')