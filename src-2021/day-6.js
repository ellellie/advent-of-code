const util = require("./util")

let input = util.getInput(6).split(",").map(Number)

let counts = Array(9).fill(0)
for (let i of input) counts[i] = (counts[i] || 0) + 1

const run = () => {
    const numNew = counts.shift()
    counts.push(numNew)
    counts[6] += numNew
}

for (let i = 0; i < 80; i++) run()
console.log(
    "Part 1",
    counts.reduce((a, b) => a + b)
)
for (let i = 0; i < 256 - 80; i++) run()
console.log(
    "Part 2",
    counts.reduce((a, b) => a + b)
)
