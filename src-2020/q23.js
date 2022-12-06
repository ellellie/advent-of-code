let input = '459672813'.split('').map(c => +c)

let add = (index, ...items) => input.splice(index, 0, ...items)
let del = (index, count) => {
    let a = input.splice(index+1, count)
    
    let b = input.splice(0, count - a.length)

    return [...a, ...b]
}

let index = 0

function move() {
    let orig = input[index]
    
    let cups = del(index, 3)

    // console.log('pick up:', cups.join(', '))

    let dest = orig - 1
    if(dest <= 0) dest = 1000000
    while(cups.includes(dest)) {
        dest--;
        if(dest <= 0)
            dest = 1000000
    }

    // if(dest === 0) dest = 9
    // console.log('destination:', dest)

    
    add(input.indexOf(dest) + 1, ...cups)

    index = input.indexOf(orig) + 1
    index%=input.length
}

for(let i = 10; i <= 1000000; i++)
    input.push(i)
console.log(input.length)

for(let i = 0; i < 10000000; i++) {
    if(i % 1000 === 0)
    console.log(`-- move ${i+1} --`)
    move()
}

let i = (input.indexOf(1) + 1) % input.length
let order = []
do {
    order.push(input[i])
    i++
    i %= input.length
} while(input[i] !== 1)

console.log(order.join(''))