const util = require("./util")
const _ = require("lodash")

let [polymer, reactions] = util.getInput(14).split("\n\n")

reactions = reactions.split("\n").map((c) => c.split(" -> "))

const pairs = (str) =>
    _.range(str.length - 1).map((i) => str.substring(i, i + 2))

const count = (arr) => {
    let counts = {}

    for (const c of arr) counts[c] = (counts[c] || 0) + 1

    return counts
}

let letters = {}
for (const char of polymer) {
    letters[char] = (letters[char] || 0) + 1
}

const step = (counts) => {
    const new_counts = {}

    for (const key in counts) {
        const amt = counts[key]

        // Does this react?
        const reaction = reactions.find(
            ([reactant, product]) => reactant === key
        )

        if (reaction) {
            const left = key[0] + reaction[1]
            const right = reaction[1] + key[1]

            new_counts[left] = (new_counts[left] || 0) + amt
            new_counts[right] = (new_counts[right] || 0) + amt

            // Pretty print the reaction
            if (process.env.DEBUG)
                console.log(
                    `${key} -> ${reaction[1]} : ${amt} unit${
                        amt > 1 ? "s" : ""
                    }`
                )

            letters[reaction[1]] = (letters[reaction[1]] || 0) + amt
        }
    }

    return new_counts
}

let counts = count(pairs(polymer))
const range = () => _.max(_.values(letters)) - _.min(_.values(letters))

for (let i = 0; i < 10; i++) counts = step(counts)

console.log("Part 1", range())

for (let i = 0; i < 30; i++) counts = step(counts)

console.log("Part 2", range())
