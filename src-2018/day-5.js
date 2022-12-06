const _     = require("lodash")
const util  = require("./util")

let input = util.input(5)

const test = input => input.split("").reduce((c, b) => {
    const a = c.slice(-1)
    return a !== b && (a.toLowerCase() == b.toLowerCase()) ?
        c.slice(0, -1) :
        c+b
}).length

const redact = (input, char) => _.remove(input.split(""), d => d.toLowerCase() !== char).join("")

console.log("Solution 1", test(input))

let sols = []
for(let char of "abcdefghijklmnopqrstuvwxyz")
    sols.push(test(redact(input, char)))

console.log("Solution 2", Math.min(...sols))