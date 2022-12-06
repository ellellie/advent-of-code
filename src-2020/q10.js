const fs = require('fs')
const input = fs.readFileSync('q10.txt', 'utf8')
    .split('\n')
    .map(Number)
    .sort((a,b) => a-b)

let high = Math.max(...input) + 3
input.push(high)

let curr = 0

let d1 = 0
let d3 = 0
for(let i of input) {
    diff = i - curr
    if(diff == 1)
        d1++
    else if(diff == 3)
        d3++

    curr = i
}

let j = {}

function p2(val) {
    if(j[val]) return j[val]
    if(val == high) return 1 // max val
    else {
        return j[val] = [1,2,3].map(
            i => input.indexOf(val+i) !== -1 ? p2(val+i) : 0
        ).reduce((a,b) => a+b)
    }
}

console.log('p1', d1 * d3)
console.log('p2', p2(0))