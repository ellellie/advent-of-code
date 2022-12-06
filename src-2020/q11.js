const fs = require('fs')
const crypto = require('crypto')
const { count } = require('console')
let input = fs.readFileSync('q11.txt', 'utf8')
    .split('\n')
    .map(row => row.split(''))

let [width, height] = [input[0].length, input.length]

function neighbors(x2, y2) {
    let sum = 0
    for(let x = x2-1; x <= x2+1; x++)
    for(let y = y2-1; y <= y2+1; y++) {
        if(x >= 0 && y >= 0 && x < width && y < height && !(x2 === x && y2 === y))
            sum += input[y][x] === '#' ? 1 : 0
    }

    return sum
}

function neighbors2(x2, y2) {
    let sum = 0
    for(let x = -1; x <= 1; x++)
    for(let y = -1; y <= 1; y++) {
        if(x === 0 && y === 0) continue;
        // cast ray until edge or seat is seen
        let x3 = x2 + x
        let y3 = y2 + y

        while(input[y3] && input[y3][x3] === '.') {
            x3 += x
            y3 += y
        }

        if(input[y3] && input[y3][x3])
            sum += input[y3][x3] === '#' ? 1 : 0
    }

    return sum
}

function step() {
    let newArr = Array(height).fill(0).map(c => Array(width).fill('.'))
    let change = false
    for(let y = 0; y < height; y++)
    for(let x = 0; x < width; x++) {
        let n = neighbors2(x, y)
        if(input[y][x] === 'L' && n === 0) {
            newArr[y][x] = '#'
            change = true
        }
        else if(input[y][x] === '#' && n >= 5) {
            newArr[y][x] = 'L'
            change = true
        } else {
            newArr[y][x] = input[y][x]
        }
    }

    input = newArr

    return change
}

const countSeats = () => input.map(c => c.filter(d => d === '#').length).reduce((a,b) => a+b)

let prev = countSeats()
while(step()){ console.log(input.map(c=>c.join('')).join('\n')+'\n') }

console.log('p1', countSeats())
