const _ = require("lodash")
const util = require("./util")

let input = util.input(9)
    .split("\n")
    //.map(c => +c)
    .map(c => {
        let [a, px, py, dx, dy] = c.match(/=<\s*(-?\d+),\s*(-?\d+)> velocity=<\s*(-?\d+),\s*(-?\d+)>/)
        return {
            pos: [+px, +py],
            vel: [+dx, +dy]
        }
    })


let low = 0
let i   = 0

let size   = [0,0]
let offset = [0,0]

const next = () => {
    for(let star of input) {
        star.pos[0] += star.vel[0]
        star.pos[1] += star.vel[1]
    }
}

const mins = () => {
    let temp = input.map(c => c.pos)
    return [Math.min(...temp.map(c => c[0])), Math.min(...temp.map(c => c[1]))]
}

const maxs = () => {
    let temp = input.map(c => c.pos)
    return [Math.max(...temp.map(c => c[0])), Math.max(...temp.map(c => c[1]))]
}

const area = () => {
    let [min, max] = [mins(), maxs()]
    let w = max[0] - min[0]
    let h = max[1] - min[1]

    return [w, h]
}

const render = () => {
    let offset = mins()
    let ayrea  = area()

    console.log(ayrea)
    let grid   = Array(ayrea[1] + 1).fill([])
    for(let i in grid) grid[i] = Array(ayrea[0] + 1).fill(" ")

    for(let star of input) {
        console.log(star.pos[1] - offset[1], star.pos[0] - offset[0])
        grid[star.pos[1] - offset[1]][star.pos[0] - offset[0]] = "#"
    }

    for(let y = 0; y < size[1]; y++)
        console.log(grid[y].join(""))
}

let prev = 812739812738912

while(true) {
    let size = area()
    let ayy = size[0] * size[1]
    if(prev > ayy) {
        prev = ayy
        render()
    } else {
        break
    }
    next()
}