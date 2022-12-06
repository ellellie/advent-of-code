const _ = require("lodash")
const util = require("./util")

const [players, final] = [441, 71032 * 100]
const mod = (i,j) => ((i%j)+j)%j

let marbles = [0, 2, 1]
let scores = Array(players).fill(0)

let index = 1

for(let i = 3; i <= final; i++) {
    if (!(i % 10000)) console.log((i / final) * 100);
    if (i % 23) {
        index = mod(index + 2, marbles.length)
        marbles.splice(index, 0, i)
    } else {
        let tgt = mod(index - 7, marbles.length)
        scores[i % players] += i + marbles[tgt]
        marbles.splice(tgt, 1)
        index = tgt
    }
}

console.log(Math.max(...scores))