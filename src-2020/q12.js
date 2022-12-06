const fs = require('fs')
const input = fs.readFileSync('q12.txt', 'utf8')
    .split('\n')
    .map(c => [c[0], +c.substr(1)])
    // .map(c => c.split())

let deg = 90
const dirs = {
    0: [0, -1],
    90: [1, 0],
    180: [0, 1],
    270: [-1, 0],
}

let [sx, sy] = [0, 0]
let [x, y] = [10, 1]

for(let [c, amt] of input) {
    switch(c) {
        case 'N':
            y+=amt
            break
        case 'S':
            y-=amt
            break
        case 'E':
            x+=amt
            break
        case 'W':
            x-=amt
            break
        case 'L':
            deg -= amt
            deg = (deg + 360) % 360
            for(let i = 0; i < (amt/90); i++)
                [x, y] = [-y, x]
            break
        case 'R':
            deg += amt
            deg = (deg + 360) % 360
            for(let i = 0; i < (amt/90); i++)
                [x, y] = [y, -x]
            break
        case 'F':
            // x += dirs[deg][0] * amt
            // y += dirs[deg][1] * amt
            sx += x * amt
            sy += y * amt

            break
    }

    console.log(c,amt, x, y, sx, sy)
}

console.log('p1', Math.abs(sx) + Math.abs(sy))