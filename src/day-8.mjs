import { getInput } from "./util.mjs";
import _ from "lodash"
import * as R from "ramda"

const input = getInput(8)
    .split('\n')
    .map( c=> c.split('').map(c => +c))
    // .map(c => +c)

const width = input[0].length
const height = input.length

const get = (x, y) => input[y][x]

let coords = []
for(let x = 0; x < width; x++)
for(let y = 0; y < height; y++)
    coords.push([x,y])

function visible(ox, oy) {
    return coords.filter(([x, y]) => x > ox).every(([x, y]) => get(x,y) < get(ox,oy))
    || coords.filter(([x, y]) => x < ox).every(([x, y]) => get(x,y) < get(ox,oy))
    || coords.filter(([x, y]) => y > oy).every(([x, y]) => get(x,y) < get(ox,oy))
    || coords.filter(([x, y]) => y < oy).every(([x, y]) => get(x,y) < get(ox,oy))
}

let part1 = 0

for(let x = 0; x < width; x++) {
    for(let y = 0; y < height; y++) {
        if(visible(x,y)) {
            part1++
            console.log(x, y)
        }
    }
}

console.log(part1)

// Part 2
function dir(dx, dy, x, y) {
    let viewingHeight = get(x, y)

    let numTrees = 1

    while(true) {
        x += dx
        y += dy

        if(x < 0 || y < 0 || x >= width || y >= height) {
            numTrees--
            break
        }

        let treeHeight = get(x, y)

        if(treeHeight >= viewingHeight) {
            break
        } else {
            numTrees++
        }
    }

    return numTrees
}

function score(x, y) {
    return dir(0, -1, x, y) * dir(-1, 0, x, y) * dir(0, 1, x, y) * dir(1, 0, x, y)
}

let part2 = 0

for(let x = 0; x < width; x++) {
    for(let y = 0; y < height; y++) {
        part2 = Math.max(part2, score(x, y))
    }
}

console.log(part2)