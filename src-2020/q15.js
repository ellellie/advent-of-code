const fs = require('fs')
const { set } = require('lodash')
const _ = require('lodash')

let input = [0,3,6]
let last = {}
for(let i in input)
    last[input[i]] = i

delete last[input[input.length-1]]

let curr = input.length

let tail = input[curr-1]

function speak() {
    console.log('turn', curr)
    if(!last[tail]) {
        console.log('-> 0')
        curr++
        tail = 0
        return 0
    } else {
        
    }
}

while(curr < 10)
    speak()