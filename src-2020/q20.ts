const TILE_SIZE: number = 10

enum Cell {
    ON = 1,
    OFF = 0
}

interface Tile {
    id: number
    grid: Cell[][]
}

function parseTile(tile: string): Tile {
    let grid = Array(TILE_SIZE).fill(undefined).map(() => Array(TILE_SIZE).fill(Cell.OFF))

    const lines = tile.split("\n")
    const tile_id = +lines[0].slice(5, lines[0].length - 1)
    for(let i = 1; i < lines.length; i++)
        for(let j = 0; j < lines[i].length; j++)
            grid[i-1][j] = lines[i][j] === "#" ? Cell.ON : Cell.OFF
    
    return {
        id: tile_id,
        grid
    }
}

const printTile = (tile: Tile) => {
    const tile_str = tile.grid.map(row => row.map(cell => cell === Cell.ON ? "#" : ".").join("")).join("\n")
    console.log(`Tile ${tile.id}:\n${tile_str}`)
}

const rotateTile = (tile: Tile) => {
    const grid = tile.grid[0].map((_, index) => tile.grid.map(row => row[index]).reverse())
    return {
        id: tile.id,
        grid
    }
}

const flipTile = (tile: Tile) => {
    const grid = tile.grid.map(row => row.reverse())
    return {
        id: tile.id,
        grid
    }
}

const tileEdges = (tile: Tile) => {
    return {
        up: tile.grid[0],
        down: tile.grid[TILE_SIZE - 1],
        left: tile.grid.map(row => row[0]),
        right: tile.grid.map(row => row[TILE_SIZE - 1])
    }
}

const allEdges = (tile: Tile) => {
    let edges = Object.values(tileEdges(tile))
    edges.push(...edges.map(edge => edge.reverse()))
    return edges
}

let tile = parseTile(`Tile 1409:
##..#.#.#.
##........
#.#...##.#
#..#..#...
.......##.
##......##
..........
.........#
.#..##....
#.##...##.`)