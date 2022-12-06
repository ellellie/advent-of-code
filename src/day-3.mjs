import { getInput } from './util.mjs';

const input = getInput(3)
    .split('\n')
    .map(c => {
        const left = c.slice(0, c.length / 2)
        const right = c.slice(c.length / 2)

        return [left, right]
    })

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

let sum = 0

// Part 1
for(const [left, right] of input) {
    const commonLetter = [...left].filter(c => right.includes(c))[0]

    sum += alphabet.indexOf(commonLetter) + 1
}
console.log(sum)

// Part 2
sum = 0
while(input.length) {
    const group = [input.shift(), input.shift(), input.shift()].map(c => c.join(''))

    const commonLetter = [...group[0]].filter(c => group[1].includes(c) && group[2].includes(c))[0]

    sum += alphabet.indexOf(commonLetter) + 1    
}

console.log(sum)
