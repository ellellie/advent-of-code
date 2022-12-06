const fs = require('fs')
const input = fs.readFileSync('q14.txt', 'utf8')
    .split('\n')

function permute(addr_) {
    let res = []
    let addr = [...addr_]
    for(let i in addr) {
        if(addr[i] === 'X') {
            addr[i] = '0'
            res.push(...permute(addr))
            addr[i] = '1'
            res.push(...permute(addr))

            return res
        }
    }

    return [parseInt(addr.join(''), 2)]
}

function p1() {
    let mask = '0'.repeat(36)
    let mem = {}
    for(let line of input) {
        let [left, right] = line.split(' = ')
        if(left === "mask") {
            mask = right
        } else {
            let addr = +left.substr(4, left.length - 5)
            let val = [...(+right).toString(2).padStart(36).replace(/\s/g, '0')]
            
            for(let i in mask)
                val[i] = mask[i] === 'X' ? val[i] : mask[i]
            
            mem[addr] = parseInt(val.join(''), 2)
        }
    }
    return Object.values(mem).reduce((a,b) => a+b)
}

function p2() {
    let mask = '0'.repeat(36)
    let mem = {}
    for(let line of input) {
        let [left, right] = line.split(' = ')
        if(left === "mask") {
            mask = right
        } else {
            let addr = [...(+left.substr(4, left.length - 5)).toString(2).padStart(36).replace(/\s/g, '0')]
            let val = +right
            for(let i = 0; i < 36; i++)
                addr[i] = mask[i] === '0' ? addr[i] : mask[i]

            for(let i of permute(addr))
                mem[i] = val

        }
    }

    return Object.values(mem).reduce((a,b) => a+b)
}

console.log('p1', p1())
console.log('p2', p2())