import { getInput } from './util.mjs';
import _ from 'lodash';

const fromRange = (x) => _.range(...x.split('-').map(c=>+c))

const input = getInput(4)
    .trim()
    .split('\n')
    .map(c => c.split(',').map(b => fromRange(b)))

const fullyContains = (a, b) => a.every(v => b.includes(v)) || b.every(v => a.includes(v))
const partialContains = (a, b) => a.some(v => b.includes(v)) || b.some(v => a.includes(v))

console.log("Part 1", input.filter(c => fullyContains(c[0], c[1])).length)
console.log("Part 2", input.filter(c => partialContains(c[0], c[1])).length)
