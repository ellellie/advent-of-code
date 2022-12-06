import { getInput } from "./util";

type UnaryOperator = 'inp'
type BinaryOperator = 'add' | 'mul' | 'div' | 'mod' | 'eql'
type Variable = 'w' | 'x' | 'y' | 'z'
type Literal = number

type Instruction = [UnaryOperator, Variable] | [BinaryOperator, Variable | Literal, Variable | Literal]

const instructions = getInput(23)
    .split("\n")
    .map(line => line.split(" ")) as Instruction[];

let i = 0;

// generate javascript code; why bother with our own interpreter?
// see the.js for the output; had to add a few lines to make it work
for (const [operator, arg1, arg2] of instructions) {
    if (operator === 'inp') {
        console.log(`${arg1} = input[${i++}]`)
    } else if (operator === 'add') {
        console.log(`${arg1} += ${arg2}`)
    } else if (operator === 'mul') {
        console.log(`${arg1} *= ${arg2}`)
    } else if (operator === 'div') {
        console.log(`${arg1} = Math.floor(${arg1} / ${arg2})`)
    } else if (operator === 'mod') {
        console.log(`${arg1} %= ${arg2}`)
    } else if (operator === 'eql') {
        console.log(`${arg1} = ${arg1} == ${arg2} ? 1 : 0`)
    }
}