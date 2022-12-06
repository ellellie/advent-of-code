const fs = require('fs')

function parseLine(line) {
    
    let parts = []
    let curr = line.shift()
    let next
    if(line.length) {
        next = line.shift()
        line.unshift(next)
    }
    if(curr === 's' && next === 'e')
        parts.push(curr + line.shift())
    else if(curr === 's' && next === 'w')
        parts.push(curr + line.shift())
    else if(curr === 'n' && next === 'e')
        parts.push(curr + line.shift())
    else if(curr === 'n' && next === 'w')
        parts.push(curr + line.shift())
    else {
        parts.push(curr)
    }

    if(line.length)
        parts.push(...parseLine(line))

    return parts
}

const input = fs.readFileSync('q24.txt', 'utf8')
    .split('\n')
    .map(line => parseLine([...line]))
    .map(line => calcMove(line))


function calcMove(line) {
    let [x, y] = [0, 0]
    for(let i of line) {
        switch(i) {
            case 'e':
                x++
                break
            case 'w':
                x--
                break
            case 'se':
                y++
                break
            case 'nw':
                y--
                break
            case 'sw':
                x--
                y++
                break
            case 'ne':
                x++
                y--
                break
        }
    }
    return [x, y]
}

let map = {}

for(let i of input) {
    
    const key = i.join(',')
    
    map[key] = map[key] ? false : true
    if(map[key] === false) delete map[key]
}

console.log('p1', Object.values(map).filter(c => c === true).length)

function neighbors(x, y) {
    return [
        [x+1, y],
        [x-1, y],
        [x, y+1],
        [x, y-1],
        [x-1, y+1],
        [x+1, y-1]
    ].map(c => c.join(','))
}

function step() {
    let edges = new Set()
    for(let key in map) {
        
        let [x, y] = key.split(',').map(c => +c)
        // console.log('>', key, x, y)
        for(let n of neighbors(x, y))
            edges.add(n)
        edges.add(key)
    }

    let newmap = {}

    for(let edge of edges) {
        let [x, y] = edge.split(',').map(c => +c)
        let n = neighbors(x, y).filter(c => map[c]).length
        // console.log(n)
        // console.log(edge, n)
        if(map[edge] && (n === 0 || n > 2)) { // black
            delete newmap[edge]
        } else if(!map[edge] && n === 2) {
            newmap[edge] = true
        } else {
            if(map[edge])
                newmap[edge] = map[edge]
        }
    }

    map = newmap
}

for(let i = 0; i < 100; i++) step()
console.log('p2', Object.values(map).filter(c => c === true).length)