const jsep = require('jsep')
const fs = require('fs')

const input = fs.readFileSync('q18.txt', 'utf8')
    .split('\n')    

function eval(node) {
    if (node.type === 'BinaryExpression') {
        const [left, right] = [eval(node.left), eval(node.right)]
        if(node.operator === '+')
            return left + right
        else
            return left * right
    }

    if (node.type === 'Literal') return node.value
}

jsep.addBinaryOp('+', 10)
jsep.addBinaryOp('*', 10)
console.log('p1', input.map(jsep).map(eval).reduce((a,b) => a+b))

jsep.addBinaryOp('*', 1)
console.log('p2', input.map(jsep).map(eval).reduce((a,b) => a+b))