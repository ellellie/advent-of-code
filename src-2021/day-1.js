const util = require("./util")
const _ = require("lodash")

const input = util
    .getInput(1)
    .split("\n")
    .map((num) => parseInt(num))

const nextInput = [...input]

let curr = input.shift()
let total = 0

while (input.length) {
    if (curr < input[0]) {
        total++
    }

    curr = input.shift()
}

console.log("Part 1", total)

const windows = Array(nextInput.length - 2)
for (let i = 2; i < nextInput.length; i++) {
    windows[i] = nextInput[i] + nextInput[i - 1] + nextInput[i - 2]
}

curr = nextInput.shift()
total = 0

while (windows.length) {
    if (curr < windows[0]) {
        total++
    }

    curr = windows.shift()
}

console.log("Part 2", total)
