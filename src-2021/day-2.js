const util = require("./util")
const _ = require("lodash")

const input = util
    .getInput(2)
    .split("\n")
    .map((n) => {
        const [dir, amt] = n.split(" ")
        return { dir, amt: parseInt(amt) }
    })

// Day 2, part 1
let depth = 0
let forward = 0

for (let { dir, amt } of input) {
    if (dir === "forward") {
        forward += amt
    }

    if (dir == "down") {
        depth += amt
    }

    if (dir == "up") {
        depth -= amt
    }
}

console.log(depth * forward)

depth = 0
forward = 0
let aim = 0

for (let { dir, amt } of input) {
    if (dir === "forward") {
        forward += amt
        depth += amt * aim
    }

    if (dir == "down") {
        aim += amt
    }

    if (dir == "up") {
        aim -= amt
    }
}

console.log(depth * forward)
