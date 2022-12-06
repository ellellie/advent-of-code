const fs = require('fs')
const input = fs.readFileSync('q3.txt', 'utf8')
    .split('\n')

const width = input[0].length

function traverse(dx, dy, x = 0, y = 0) {
    let num_trees = 0
    while(y < input.length) {
        if(input[y][x % width] == '#') num_trees++
        x += dx
        y += dy
    }

    return num_trees
}

console.log('p1', traverse(1, 1))
console.log('p2', [[1,1],[3,1],[5,1],[7,1],[1,2]].map(([dx, dy]) => traverse(dx, dy)).reduce((a,b) => a+b))
