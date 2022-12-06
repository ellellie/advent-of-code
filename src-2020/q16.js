const fs = require('fs')
const _ = require('lodash')
let [info_lines, ticket, nearby_tickets] = fs.readFileSync('q16.txt', 'utf8')
    .split('\n\n')
    .map(c => c.split('\n'))

ranges 