const util = require("./util")
const _ = require("lodash")

let input = util.getInput(7).split(",").map(Number)

const range = _.range(_.min(input), _.max(input))

const part1 = _(range)
    .map((target) =>
        _(input)
            .map((pos) => Math.abs(pos - target))
            .sum()
    )
    .min()

const part2 = _(range)
    .map((target) =>
        _(input)
            .map((pos) => Math.abs(pos - target))
            .map((x) => (x ** 2 + x) / 2)
            .sum()
    )
    .min()

console.log("Part 1", part1)
console.log("Part 2", part2)
