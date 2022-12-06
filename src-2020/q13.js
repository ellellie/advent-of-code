const fs = require('fs')
let [earliest, times] = fs.readFileSync('q13.txt', 'utf8').split('\n')

earliest = +earliest
times = times.split(',').map(c => c === "x" ? undefined : +c)

let [minbus, mintime] = [0, Infinity]

for(let i of times) {
    let earliestDep = i * Math.floor(earliest / i) + i
    if(mintime > earliestDep - earliest) {
        [minbus, mintime] = [i, earliestDep - earliest]
    }
}

console.log('p1', minbus * mintime)

const gcd = (a,b) => b === 0 ? a : gcd(b, a%b)
const lcm = (a,b) => a*b/gcd(a,b)

let ts = 0
let step = 1

for(let i in times) {
    if(times[i]) {
        let bus = times[i]
        let mod = (bus*1000-i) % bus
        while(ts % bus !== mod)
            ts = ts + step
        step = lcm(step, bus)
    }
}

console.log(ts)