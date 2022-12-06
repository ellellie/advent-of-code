const util = require('../util')
const _ = require('lodash')

let input = util
    .get_input(2)
    .split('\n')
    .map((line) => line.split('x').map(Number))

const surface_area = ([l, w, h]) => 2 * l * w + 2 * w * h + 2 * h * l
const wrapping_paper = ([l, w, h]) =>
    surface_area([l, w, h]) + _.min([l * w, w * h, h * l])

console.log(
    'Part 1',
    input.map(wrapping_paper).reduce((a, b) => a + b)
)

const ribbon = ([l, w, h]) => {
    const [a, b, c] = [l, w, h].sort((a, b) => a - b)
    return a * 2 + b * 2 + l * w * h
}

console.log(
    'Part 2',
    input.map(ribbon).reduce((a, b) => a + b)
)
