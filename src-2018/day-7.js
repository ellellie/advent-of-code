const _ = require("lodash")
const util = require("./util")

let input = util.input(7)

let fabric = {}

input = input.split("\n")
             .map(c => {
                 let m = c.match(/^Step (.).* step (.)/)
                 return [m[1], m[2]]
             })

let steps = {}
let all = []

for(let j of input) {
    fabric[j[0]] = fabric[j[0]] || []
    fabric[j[1]] = fabric[j[1]] || []
    fabric[j[1]].push(j[0])

    all.push(j[0])
    all.push(j[1])

    all = _.uniq(all)
}

let solution = ""
let done = false

function next() {
    run = []

    for(let i in fabric)
        if(!fabric[i].length)
            run.push(i)

    run = run.sort()[0]

    delete fabric[run]
    
    if(!run) {
        done = true
        return
    }

    for(let i in fabric)
        _.remove(fabric[i], c => c == run)
    
    solution += run
}

while(!done)
    next()

console.log(solution)