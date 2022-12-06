const fs = require('fs')
const input = fs.readFileSync('q8.txt', 'utf8')

const Intc = require('./asm')

let p1 = 0
let p2 = 0

let int = new Intc(input)
console.log(int.run())
