const util = require("./util")
const _ = require("lodash")
const crypto = require("crypto")

let input = util
    .getInput(9)
    .split("\n")
    // .map(Number)
    .map((line) => line.split("").map(Number))

const hash = (data) => crypto.createHash("md5").update(data).digest("hex")

const get = (x, y) => input[y][x]

const neighbors2 = (x, y) => {
    const n = []
    if (x > 0) n.push([x - 1, y])
    if (x < input[0].length - 1) n.push([x + 1, y])
    if (y > 0) n.push([x, y - 1])
    if (y < input.length - 1) n.push([x, y + 1])

    return n
}

const neighbors = (x, y) => {
    const n = []
    if (x > 0) n.push(get(x - 1, y))
    if (x < input[0].length - 1) n.push(get(x + 1, y))
    if (y > 0) n.push(get(x, y - 1))
    if (y < input.length - 1) n.push(get(x, y + 1))

    return n
}

let total = 0
let low = []

for (let x = 0; x < input[0].length; x++) {
    for (let y = 0; y < input.length; y++) {
        const val = get(x, y)
        const n = neighbors(x, y)

        if (n.every((v) => v > val)) {
            total += val + 1
            low.push([x, y])
        }
    }
}

console.log("Part 1", total)

// Spread out basins
let basins = []

for (let i = 0; i < low.length; i++) {
    let arr = [low[i]]

    let n = arr.flatMap(([x, y]) => neighbors2(x, y))
    n = arr.flatMap(([x, y]) => neighbors2(x, y))
    n = _.uniqBy(n, JSON.stringify)
    n = n.filter(
        (c) => !arr.some((a) => JSON.stringify(a) === JSON.stringify(c))
    )
    n = n.filter((c) => get(...c) < 9)

    while (n.length > 0) {
        arr = [...n, ...arr]
        n = arr.flatMap(([x, y]) => neighbors2(x, y))
        n = _.uniqBy(n, JSON.stringify)
        n = n.filter(
            (c) => !arr.some((a) => JSON.stringify(a) === JSON.stringify(c))
        )
        n = n.filter((c) => get(...c) < 9)
    }

    const x = hash(
        JSON.stringify(
            arr.map((c) => c.join(",")).sort((a, b) => a.localeCompare(b))
        )
    )

    basins.push([x, arr])
}

const x = _.uniqBy(basins, (c) => c[0])
    .map((c) => c[1].length)
    .sort((a, b) => b - a)

console.log("Part 2", x[0] * x[1] * x[2])
