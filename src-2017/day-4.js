const util = require('../util')
const _ = require('lodash')

let input = util.get_input(4)

let nonce = 0

while (true) {
    let hash = util.hash(input + nonce)
    if (hash.startsWith('00000')) {
        console.log('Part 1', nonce)
        break
    }
    nonce++
}

while (true) {
    let hash = util.hash(input + nonce)
    if (hash.startsWith('000000')) {
        console.log('Part 2', nonce)
        break
    }
    nonce++
}
