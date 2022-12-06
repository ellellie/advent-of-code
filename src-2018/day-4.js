const _     = require("lodash")
const util  = require("./util")

let input = util.input(4).split("\n").map(c => {
    [l, d, ...a] = c.match(/^\[(.+)\] (.+)$/)
    return [new Date(d.split(" ").join("T") + ":00Z"), ...a]
})
input = _.sortBy(input, c => c[0])

let guard = -1
let sleep = {}

for(let c of input) {
    const spl = c[1].split(" ")
    let sp
    switch(spl[0]) {
        case "Guard":
            guard = +spl[1].substring(1)
            if(!sleep[guard])
                sleep[guard] = {
                    guard,
                    sleep: new Array(60).fill(0),
                    asleep: false,
                    days: 0
                }
            sleep[guard].days++
            break;
        case "falls":
            sp = sleep[guard]
            if(!sp.asleep)
            for(let i=c[0].getUTCMinutes();i<60;i++)
                sp.sleep[i]++
            sp.asleep = true
            break;
        case "wakes":
            sp = sleep[guard]
            if(sp.asleep)
            for(let i=c[0].getUTCMinutes();i<60;i++) {
                sp.sleep[i]--
                sp.sleep[i] = Math.max(0, sp.sleep[i])
            }
            sp.asleep = false
            break;
        default:
            console.error(spl[0])
            break;
    }
}

Object.values(sleep).forEach(guard => {
    guard.avg = guard.sleep.reduce((a,b) => a+b)
})

const sort = _.sortBy(Object.values(sleep), "avg")
console.log(sort[0])
const target = sort[sort.length-1]
let index = 0
let high = -1
for(let i in target.sleep)
    if(target.sleep[i] > high) {
        index = +i
        high = target.sleep[i]
    }

console.log("part 1", target.guard * index)

let ng = 0
let mi = -1
let h  = -1

_(sleep).values().forEach(c => {
    for(let m in c.sleep) {
        if(c.sleep[m] > h) {
            ng = c.guard
            mi = +m
            h  = c.sleep[m]
        }
    }
})
console.log(mi)
console.log("part 2", sleep[ng].guard * mi)