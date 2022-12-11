import { getInput } from "./util.mjs"

const input = getInput(10)
    .split('\n')
    .map(c => c.split(/\s+/))

let strength = 0
let x = 1 // i thought it was 0... http://adventofreadingcomprehension.com/
let cycle = 0

let row = ""
const rows = []

const draw = (cycle, x) => {
    row += Math.abs(x - (cycle % 40)) <= 1 ? "\u2588" : " "
    if(row.length === 40) {
        rows.push(row)
        row = ""
    }
}

const inc = () => {
    cycle++
    if((cycle - 20) % 40 === 0)
        strength += x * cycle
}

for(let [ins, arg] of input) {
    if(ins === 'addx') {
        draw(cycle, x)
        inc()

        draw(cycle, x)
        inc()
        
        x += parseInt(arg)
    } else if(ins === 'noop') {
        draw(cycle, x)
        inc()
    }
}

console.log("Part 1", strength)
console.log("Part 2")

for(const row of rows) console.log(row)