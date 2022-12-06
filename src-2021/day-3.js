const util = require("./util")
const _ = require("lodash")

const input = util
    .getInput(3)
    .split("\n")
    .map((line) => line.split(""))

const gamma = new Array(input[0].length)
    .fill(0)
    .map((__, i) =>
        input.map((item) => item[i] === "1").reduce((a, b) => a + b)
    )
    .map((c) => (c > input.length / 2 ? "1" : "0"))
    .join("")

const epsilon = new Array(input[0].length)
    .fill(0)
    .map((__, i) =>
        input.map((item) => item[i] === "0").reduce((a, b) => a + b)
    )
    .map((c) => (c > input.length / 2 ? "1" : "0"))
    .join("")

console.log("Part 1", parseInt(gamma, 2) * parseInt(epsilon, 2))

// Part 2
const nums = [...input]
const len = nums[0].length

function oxygen_generator(nums, index = 0) {
    if (nums.length === 1) return parseInt(nums[0].join(""), 2)

    let count = 0
    for (let n of nums) {
        if (n[index] === "1") {
            count++
        }
    }

    const val = count >= nums.length / 2 ? "1" : "0"

    return oxygen_generator(
        nums.filter((n) => n[index] === val),
        index + 1
    )
}

function co2_generator(nums, index = 0) {
    if (nums.length === 1) return parseInt(nums[0].join(""), 2)

    let count = 0
    for (let n of nums) {
        if (n[index] === "1") {
            count++
        }
    }

    const val = count >= nums.length / 2 ? "0" : "1"

    return co2_generator(
        nums.filter((n) => n[index] === val),
        index + 1
    )
}

console.log("Part 2", oxygen_generator(nums) * co2_generator(nums))
