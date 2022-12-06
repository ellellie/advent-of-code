const util = require("./util")
const _ = require("lodash")
const { listeners } = require("process")

let input = util.getInput(10).split("\n")
// .map(Number)
// .map((line) => line.split("").map(Number))

const getCorrespondingBracket = (char) => {
    return {
        ")": "(",
        "}": "{",
        "]": "[",
        ">": "<",
        // Just in case
        "(": ")",
        "{": "}",
        "[": "]",
        "<": ">",
    }[char]
}

const table = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
}

let total = 0

let incomplete = []

for (const line of input) {
    // Check if the line has correct opening and closing brackets.
    let stack = []

    let score = 0

    for (const char of line) {
        if (char === "(" || char === "[" || char === "{" || char === "<") {
            stack.push(char)
        } else if (
            char === ")" ||
            char === "]" ||
            char === "}" ||
            char === ">"
        ) {
            const val = stack.pop()
            if (char !== getCorrespondingBracket(val)) {
                score += table[char]
            }
        }
    }
    // if (stack.length === 0) {
    total += score
    // }

    if (score === 0) {
        incomplete.push(stack)
    }
}

console.log("Part 1", total)

const table2 = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
}

const scores = incomplete
    .map((stack) => {
        const nums = stack
            .map(getCorrespondingBracket)
            .reverse()
            .map((c) => table2[c])

        let score2 = 0

        for (const num of nums) {
            score2 *= 5
            score2 += num
        }

        return score2
    })
    .sort((a, b) => a - b)

console.log("Part 2", scores[Math.floor(scores.length / 2)])
