const util = require("./util")
const _ = require("lodash")

let input = util
    .getInput(8)
    .split("\n")
    .map((c) => c.split(" | "))
    .map(([left, right]) => {
        return [
            left
                .split(" ")
                .map((c) => [...c].sort((a, b) => a.localeCompare(b)).join("")),
            right.split(" "),
        ]
    })

function* permute(curr = [], remaining = parts) {
    if (remaining.length === 0) {
        yield curr
    } else
        for (let i = 0; i < remaining.length; i++) {
            const gen = permute(
                [...curr, remaining[i]],
                remaining.filter((c) => c !== remaining[i])
            )

            for (let perm of gen) yield perm
        }
}

function part1() {
    let total = 0

    for (const [left, right] of input) {
        for (const item of right)
            if (
                item.length === 2 || // one
                item.length === 4 || // four
                item.length === 3 || // seven
                item.length === 7 // eight
            )
                total++
    }

    return total
}

function part2() {
    let total = 0

    const segments = {
        abcefg: 0,
        cf: 1,
        acdeg: 2,
        acdfg: 3,
        bcdf: 4,
        abdfg: 5,
        abdefg: 6,
        acf: 7,
        abcdefg: 8,
        abcdfg: 9,
    }

    for (const [left, right] of input) {
        const map = {}

        for (const letter of "abcdefg") {
            const hasLetter = left.filter((c) => c.includes(letter))

            if (hasLetter.length === 9) map[letter] = "f"
            if (hasLetter.length === 8) {
                map[letter] = hasLetter
                    .filter((c) => c.includes(letter))
                    .some((c) => c.length === 2)
                    ? "c"
                    : "a"
            }
            if (hasLetter.length === 7) {
                map[letter] = hasLetter
                    .filter((c) => c.includes(letter))
                    .some((c) => c.length === 4)
                    ? "d"
                    : "g"
            }
            if (hasLetter.length === 6) map[letter] = "b"
            if (hasLetter.length === 4) map[letter] = "e"
        }

        // Given our map, we can now turn the right hand side into a number
        let number = right
            .map((item) => {
                const num = [...item]
                    .map((letter) => map[letter])
                    .sort((a, b) => a.localeCompare(b))
                    .join("")

                return num
            })
            .map((item) => segments[item])
            .reduce((a, b) => a * 10 + b)

        total += number
    }

    return total
}

console.log("Part 1", part1())
console.log("Part 2", part2())
