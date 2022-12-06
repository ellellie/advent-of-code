const util = require('../util')
const _ = require('lodash')

let input = util.get_input(1)

let floor = 0

for (const index in input) {
    const char = input[index]
    if (char === '(') {
        floor++
    } else if (char === ')') {
        floor--
    }
}

console.log('Part 1', floor)

floor = 0

for (const index in input) {
    const char = input[index]
    if (char === '(') {
        floor++
    } else if (char === ')') {
        floor--
    }

    if (floor === -1) {
        console.log('Part 2', +index + 1)
        break
    }
}
