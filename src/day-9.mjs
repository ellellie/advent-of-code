import { getInput } from "./util.mjs"

const input = getInput(9)   
    .split("\n")
    .map(c => c.split(' '))

let map = new Set()

let head = [0, 0]
let tail = [0, 0]

const visit = (c) => map.add(c.join(','))

const isTouching = (head, tail) => 
    Math.abs(head[0] - tail[0]) <= 1 &&
    Math.abs(head[1] - tail[1]) <= 1

const chase = (head, tail) => {
    if(isTouching(head, tail)) return
    tail[0] += Math.sign(head[0] - tail[    0])
    tail[1] += Math.sign(head[1] - tail[1])
    return [head, tail]
}

const dirs = {
    R: [1, 0],
    L: [-1,0],
    U: [0,-1],
    D: [0, 1]
}

for(const [dir, amt] of input) {
    const vec = dirs[dir]

    for(let i = 0; i < amt; i++) {
        head[0] += vec[0]
        head[1] += vec[1]

        if(!isTouching(head, tail)) {
            chase(head, tail)
            visit(tail)
        }
    }
}

console.log("Part 1", map.size)

map = new Set()

let tails = [
    [0, 0], // H
    [0, 0], // 1
    [0, 0], // 2
    [0, 0], // 3
    [0, 0], // 4
    [0, 0], // 5
    [0, 0], // 6
    [0, 0], // 7
    [0, 0], // 8
    [0, 0], // 9
]

for(const [dir, amt] of input) {
    const vec = dirs[dir]

    for(let i = 0; i < amt; i++) {
        tails[0][0] += vec[0]
        tails[0][1] += vec[1]

        for(let j = 0; j < 9; j++) {
            let head = tails[j]
            let tail = tails[j + 1]

            if(j === 8) visit(tail)

            if(!isTouching(head, tail)) {
                chase(head, tail)
                if(j === 8) visit(tail)
            }
        }
    }
}

console.log("Part 2", map.size)

