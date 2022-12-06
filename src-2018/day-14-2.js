const _ = require("lodash")

const input = 170641

// helpers
const toDigits = num => {
    let digits = []
    while(num >= 10) {
        digits.push(num % 10)
        num = Math.floor(num / 10)
    }
    digits.push(num)
    return digits.reverse()
}

const equals = (a,b) => {
    for(i in a) if(a[i] !== b[i])
        return false
    return true
}

// constants
const target = toDigits(input)

// variables
let scores = [3, 7]
let elves  = [0, 1]
let shift  = Array(target.length).fill(-1)

let found = false

const tick = () => {
    let digits = toDigits(scores[elves[0]] + scores[elves[1]])
    
    scores.push(...digits)
    
    elves[0] = (elves[0] + scores[elves[0]] + 1) % scores.length
    elves[1] = (elves[1] + scores[elves[1]] + 1) % scores.length

    shift.shift()
    if(digits.length > 1) shift.shift() // again!

    shift.push(...digits)

    //console.log(shift, target)
    if(equals(shift, target) && !found) {
        console.log(scores.length - target.length)
        found = true
    }
}

while(true) tick()