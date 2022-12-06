const map = `
#############
#...........#
###D#D#C#B###
  #B#A#A#C#
  #########
`.trim().split('\n')

type GridEntry = '.' | '#' | 'A' | 'B' | 'C' | 'D'
type GridKey = `${number},${number}`
type Grid = { [key: GridKey]: GridEntry }

const grid: Grid = {}

for (let y = 0; y < map.length; y++)
    for (let x = 0; x < map[y].length; x++)
        grid[`${x},${y}`] = map[y][x] as GridEntry

type Pos = [x: number, y: number]

const get = (grid: Grid, pos: Pos): GridEntry => grid[`${pos[0]},${pos[1]}`] || '#'
const set = (grid: Grid, pos: Pos, val: GridEntry) => grid[`${pos[0]},${pos[1]}`] = val
const clone = (grid: Grid): Grid => {
    const newGrid: Grid = {}
    for (let key in grid)
        newGrid[key as GridKey] = grid[key as GridKey]

    return newGrid
}

const visualize = (grid: Grid) => {
    for (let y = 0; y < map.length; y++) {
        let line = ''
        for (let x = 0; x < map[y].length; x++) {
            line += get(grid, [x, y])
        }
        console.log(line)
    }
}

const get_neighbors = (grid: Grid, pos: Pos): Pos[] => {
    const [x, y] = pos
    const newPos = [
        [x, y - 1],
        [x, y + 1],
        [x - 1, y],
        [x + 1, y],
    ] as Pos[]

    return newPos.filter((pos: Pos) => get(grid, pos) !== '#')
}

const swap = (grid: Grid, pos1: Pos, pos2: Pos) => {
    const tmp = get(grid, pos1)
    set(grid, pos1, get(grid, pos2))
    set(grid, pos2, tmp)
}

const best_path = (pos: Pos, target: Pos): [path: Pos[], cost: number] => {
    // Find the shortest path from pos to target
    // Where '#' is a wall, and the path is a series of swaps

    // Swapping with a wall is a no-op
    // Swapping a . costs 0
    // Swapping an A costs 1
    // Swapping a B costs 10
    // Swapping a C costs 100
    // Swapping a D costs 1000

    const get_cost = (grid: Grid, pos: Pos): number => {
        const [x, y] = pos
        const [tx, ty] = target

        if (get(grid, pos) === '.') return 0
        if (get(grid, pos) === 'A') return 1
        if (get(grid, pos) === 'B') return 10
        if (get(grid, pos) === 'C') return 100
        if (get(grid, pos) === 'D') return 1000

        return Infinity
    }

    // Find the lowest cost path to target
    // via. a series of swaps

    const dfs = (grid: Grid, pos: Pos, target: Pos, path: Pos[], cost: number): [path: Pos[], cost: number] => {
        console.log(pos, target)
        if (pos[0] === target[0] && pos[1] === target[1]) {
            console.log(`Found path: ${path.length} steps, cost: ${cost}`)
            visualize(grid)
            return [path, cost]
        }

        // Get neighbors of pos
        const neighbors = get_neighbors(grid, pos)
            // Ensure that this pos has not already been visited
            .filter((neighbor: Pos) => !path.some((p: Pos) => p[0] === neighbor[0] && p[1] === neighbor[1]))
            .sort((a: Pos, b: Pos) => get_cost(grid, a) - get_cost(grid, b))

        if (neighbors.length === 0)
            return [path, Infinity]


        let best_cost = Infinity
        let best_path: Pos[] = []
        for (const neighbor of neighbors) {
            const new_grid = clone(grid)
            swap(new_grid, pos, neighbor)

            const [new_path, new_cost] = dfs(new_grid, neighbor, target, [...path, neighbor], cost + get_cost(grid, pos) + get_cost(grid, neighbor))

            if (new_cost < best_cost) {
                best_cost = new_cost
                best_path = new_path
            }
        }

        return [best_path, best_cost]
    }

    return dfs(grid, pos, target, [pos], 0)
}

console.log(best_path([3, 3], [8, 3]))