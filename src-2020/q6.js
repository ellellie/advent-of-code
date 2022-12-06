const fs = require('fs')
const input = fs.readFileSync('q6.txt', 'utf8')
    .split('\n\n')

let total = 0
for(const answers of input) {
    let ans2 = new Set([...'abcdefghijklmnopqrstuvwxyz'])
    for(let k of answers.split('\n')) {
        console.log(k, ans2.size)
        ans2 = new Set([...ans2].filter(x => k.indexOf(x) !== -1))
    }
    total += ans2.size
}

console.log(total)
//console.log(ans2)