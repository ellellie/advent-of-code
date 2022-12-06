const _ = require('lodash')
const fs = require('fs')
const input = fs.readFileSync('q17.txt', 'utf8')
    .split('\n')    
    .map(c => c.split(''))

let world = []

const hc = (x, y, z = 0, k) => `${x},${y},${z},${k}`
const ch = str => str.split(',').map(c => +c)
const set = (x, y, z, k, v, w = world) => v ? w[hc(x,y,z,k)] = v : delete w[hc(x,y,z,k)]

for(let y in input)
    for(let x in input[y])
        set(x, y, 0, 0, input[y][x] === '#')

function edge(x, y, z, k) {
    let edges = []
    for(let dx = -1; dx < 2; dx++)
    for(let dy = -1; dy < 2; dy++)
    for(let dz = -1; dz < 2; dz++)
    for(let dk = -1; dk < 2; dk++)
        if(!(dx === 0 && dy === 0 && dz === 0 && dk === 0))
            edges.push(hc(x+dx,y+dy,z+dz,k+dk))
    
    return edges
}

function neighbors(x, y, z, k) {
    const keys = edge(x, y, z, k)
    let sum = 0
    for(let key of keys)
        if(world[key]) sum++
    return sum
}

function tick() {
    let edges = new Set()
    for(let node in world) {
        for(let nn of edge(...ch(node)))
            edges.add(nn)
    }

    let newworld = []

    for(let node of edges) {
        let [x, y, z, k] = ch(node)
        const sum = neighbors(x, y, z, k)
        if(world[node])
            set(x, y, z, k, (sum === 2 || sum === 3), newworld)
        else
            set(x, y, z, k, sum === 3, newworld)
    }

    world = newworld
}

for(let i = 0; i<6;i++)
    tick()


console.log('p1', Object.keys(world).length)
