const fs = require('fs')
const input = fs.readFileSync('q5.txt', 'utf8')
    .split('\n')

let min = Infinity
let max = -1
let ids = []
for(const seat of input) {
    let [lower, upper] = [0, 127]
    for(const char of seat.substr(0, 7)) {
        if(char == "F") {
            // upper half
            upper -= Math.floor((upper - lower) / 2)
        } else {
            // lower half
            lower += Math.ceil((upper - lower) / 2)
        }
    }

    let row = lower+0

    lower = 0
    upper = 7
    for(const char of seat.substr(7, 3)) {
        if(char == "R") {
            // upper half
            lower += Math.ceil((upper - lower) / 2)
        } else {
            // lower half
            upper -= Math.floor((upper - lower) / 2)
        }
    }

    let col = lower
    let id = row*8 + col
    min = Math.min(min, id)
    max = Math.max(max, id)
    ids.push(id)
}

console.log('p1', max)
ids = ids.sort((a,b)=>a-b).map(c => `${c} ${c%10}`)
console.log(ids.join('\n'))
