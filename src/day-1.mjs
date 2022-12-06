import { getInput } from './util.mjs';

const input = getInput(1)
    .split('\n\n')
    .map((group) => group.split('\n').map(c => +c));

console.log(Math.max(...input.map(group => group.reduce((a,b) => a + b, 0))))

const elves = input.map(group => group.reduce((a,b) => a + b, 0))
    .sort((a,b) => b - a)

console.log(elves[0] + elves[1] + elves[2])