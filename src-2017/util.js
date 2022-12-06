const fs = require('fs')
const crypto = require('crypto')

const get_input = (day) => {
    const data = fs.readFileSync(`./inputs/day-${day}.txt`, 'utf8')
    return data.trim() // Trim leading and following newlines
}

const hash = (data, algorithm = 'md5', format = 'hex') =>
    crypto.createHash(algorithm).update(data).digest(format)

const { infinite_grid } = require('./infinite_grid')

module.exports = { get_input, hash, infinite_grid }
