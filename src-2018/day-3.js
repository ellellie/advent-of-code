const _     = require("lodash")
const util  = require("./util")

let input = util.input(3).split("\n").map(line => {
    [e, x, y, w, h] = line.match(/@ (\d+),(\d+): (\d+)x(\d+)/).map(c=>+c)
    return { x, y, w, h }
})

let grid = []

const get = (x, y) => grid[x + y*1000] || 0
const add = (x, y, i) => grid[x + y*1000] = get(x,y) == 0 ? i : false

for(let claim of input) {
    for(let x = claim.x; x < claim.x + claim.w; x++)
        for(let y = claim.y; y < claim.y + claim.h; y++) {
            add(x, y, claim.id)
        }
}

const x = _.filter(grid, c => !!c)
console.log(x)