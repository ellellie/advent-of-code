const _ = require("lodash")
const util = require("./util")

let input = util.input(7)

let tree = {}
let all = []

input = input.split("\n")
             .forEach(c => {
                 let [o, a, b] = c.match(/^Step (.).* step (.)/)
                 tree[a] = tree[a] || []
                 tree[b] = tree[b] || []
                 tree[b].push(a)

                 all.push(a,b)
             })

let cost = i => "ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(i) + 60

let workers = [
    {work: 0, target: null, id: 0},
    {work: 0, target: null, id: 1},
    {work: 0, target: null, id: 2},
    {work: 0, target: null, id: 3},
    {work: 0, target: null, id: 4}
]

let solution = ""
let tick = 0

function next() {
    let possibilities = _.filter(Object.keys(tree), c => !tree[c].length && !_.includes(workers.map(d=>d.target), c)).sort()

    for(worker of workers) {
        if(!worker.work) {
            if(worker.target != null) {
                solution += worker.target
                for(let i in tree)
                    _.remove(tree[i], c => c == worker.target)
            }

            worker.target = null

            let target = possibilities.shift()
            if(!target) continue // all nodes still have children. wait.
            delete tree[target]

            let time = cost(target)
            console.log(`${target}: ${tick} -> ${tick+time}`)
            worker.work = time
            worker.target = target
        }
        worker.work--
    }
    tick++
}

while(_.filter(workers.map(c => c.target), d => !!d).length || Object.keys(tree).length)
    next()

console.log(tick)