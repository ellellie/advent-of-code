import _ from "lodash"
import { getInput } from "./util.mjs"

// Parser written after AoC. Was hand-parsed intially.
const input = getInput(11)

const monkeys = input.split('\n\n')
    .map(monkey => {
        const rows = monkey.trim().split('\n').map(c => c.split(":")[1].trim()).slice(1)
        
        const items = rows[0].split(', ').map(c => +c)
        const op = eval("(old) => " + rows[1].split(" =")[1])
        const divisor = +rows[2].split('by ')[1]
        const monkeyA = +rows[3].split('monkey ')[1]
        const monkeyB = +rows[4].split('monkey ')[1]

        return { items, op, divisor, monkeyA, monkeyB }
    })

// Below this point is the original code.

// Should be a multiple of the LCM
const bigDivisor = monkeys.map(c => c.divisor).reduce((a, b) => a * b)

const round = (monkeys, factor) => {
    for(let i in monkeys) {
        const monkey = monkeys[i]
        monkey.counts ??= 0

        while(monkey.items.length) {
            let item = monkey.items.shift()
            item = Math.floor((monkey.op(item) % bigDivisor) / factor)

            item % monkey.divisor === 0 ?
                monkeys[monkey.monkeyA].items.push(item) :
                monkeys[monkey.monkeyB].items.push(item)

            monkey.counts++
        }
    }
}

const monkeysA = _.cloneDeep(monkeys)
for(let i = 0; i < 20; i++) {
    round(monkeysA, 3)
}

let mischief = monkeysA.map(c => c.counts).sort((a, b) => b - a)    
console.log("Part 1", mischief[0] * mischief[1])

const monkeysB = _.cloneDeep(monkeys)
for(let i = 0; i < 10000; i++) {
    round(monkeysB, 1)
}

mischief = monkeysB.map(c => c.counts).sort((a, b) => b - a)
console.log("Part 2", mischief[0] * mischief[1])