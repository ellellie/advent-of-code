import { getInput } from "./util.mjs"
import _ from "lodash"

const scans = getInput(19)
    .split("\n\n")
    .map((c) =>
        c
            .split("\n")
            .slice(1)
            .map((num) => num.split(",").map(Number))
    )

// Permute [x, y, z] to it's possible rotations
function* permute(...num_opts) {
    if (num_opts.length === 0) return []

    const head = num_opts.shift()
    for (let num = 0; num < head; num++) {
        if (num_opts.length === 0) yield [num]
        else
            for (const perm of permute(...num_opts)) {
                yield [num, ...perm]
            }
    }
}

const rearrange = ([x, y, z], val) => {
    if (val === 0) return [x, y, z]
    if (val === 1) return [x, z, y]
    if (val === 2) return [y, x, z]
    if (val === 3) return [y, z, x]
    if (val === 4) return [z, x, y]
    if (val === 5) return [z, y, x]
}

function* get_adjustments(scan) {
    for (const [x, y, z, w] of permute(2, 2, 2, 6)) {
        let result = _.cloneDeep(scan)

        if (x === 1) result = result.map(([x, y, z]) => [-x, y, z])
        if (y === 1) result = result.map(([x, y, z]) => [x, -y, z])
        if (z === 1) result = result.map(([x, y, z]) => [x, y, -z])

        result = result.map(([x, y, z]) => rearrange([x, y, z], w))

        yield result
    }
}

function make_similar(a, b) {
    // Find min of each axis of a
    const min_a = a.reduce(
        ([x, y, z], [x2, y2, z2]) => [
            Math.min(x, x2),
            Math.min(y, y2),
            Math.min(z, z2),
        ],
        [Infinity, Infinity, Infinity]
    )

    // Find max of each axis of b
    const min_b = b.reduce(
        ([x, y, z], [x2, y2, z2]) => [
            Math.min(x, x2),
            Math.min(y, y2),
            Math.min(z, z2),
        ],
        [Infinity, Infinity, Infinity]
    )

    const b_adj = b.map(([x, y, z]) => [
        x - min_b[0] + min_a[0],
        y - min_b[1] + min_a[1],
        z - min_b[2] + min_a[2],
    ])

    return b_adj
}

const similarity = (a, b) =>
    a.filter(([x, y, z]) =>
        b.some(([x2, y2, z2]) => x === x2 && y === y2 && z === z2)
    ).length

const a = scans[0]
const b = scans[1]

for (const adjustment of get_adjustments(b)) {
    console.log(adjustment[0], similarity(a, make_similar(a, adjustment)))
}
