import { getInput } from './util.mjs';

const input = getInput(5).split('\n\n')[1]

const cargo = [
    "BLDTWCFM",
    "NBL",
    "JCHTLV",
    "SPJW",
    "ZSCFTLR",
    "WDGBHNZ",
    "FMSPVGCN",
    "WQRJFVCZ",
    "RPMLH"
].map(c => c.split(''))

const moveN = (from, to, n) => cargo[to].push(...cargo[from].splice(-n)) // add .reverse() for part 1

for(const line of input.split('\n')) {
    const x = line.split(' ')
    const n = +x[1]
    const from = +x[3]
    const to = +x[5]

    console.log({from, to, n})

    moveN(from-1, to-1, n)
}

console.log(cargo.map(c => c.reverse()[0]))