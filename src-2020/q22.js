const fs = require('fs')
const [p1, p2] = fs.readFileSync('q22.txt', 'utf8')
    .split('\n\n')
    .map(c => {
        const [x, ...nums] = c.split('\n')
        return nums.map(c => +c)
    })

const hash = (dA, dB) => dA.join(',') + ' ' + dB.join(',')

let i = 0

function game(play1, play2) {
    let history = new Set();
    
    let p1 = [...play1]
    let p2 = [...play2]

    while(p1.length > 0 && p2.length > 0) {
        i++
        const state = hash(p1, p2)

        if(history.has(state))
            return [p1, 1]
        else history.add(state)

        let p1n = p1.shift()
        let p2n = p2.shift()

        let winner = p1n > p2n ? 1 : 2

        if(p1.length >= p1n && p2.length >= p2n)
            winner = game(p1.slice(0, p1n), p2.slice(0, p2n))[1]

        if(winner === 1)
            p1.push(p1n, p2n)
        else
            p2.push(p2n, p1n)
    }

    if(p1.length > 0)
        return [p1, 1]
    else
        return [p2, 2]
}

let [deck, winner] = game(p1, p2)

console.log(deck, winner)
console.log(deck.map((c, i) => (deck.length - i) * c).reduce((a,b) => a+b))
console.log(i)