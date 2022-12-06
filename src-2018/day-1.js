const util = require("./util")

const input = util.input(1)
console.log(`Solution 1: ${eval(input)}`)

const recurr = input.split("\n").map(s => +s)
let curr = 0

const seen = {}

let j = -1

while(true) {
    j++
    const i = recurr[j%recurr.length]
    curr += i

    if(seen[curr]) {
        console.log(`Solution 2: ${curr}`)
        break
    }

    seen[curr] = true
}
// evsialkqyiurohizpwucngttmf evsialkqyiurohxzpwucngttmf
// evsialkqyiurohzpwucngttmf
// this was manually diffed.