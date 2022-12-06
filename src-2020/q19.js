const fs = require('fs')
let [nums, letters] = fs.readFileSync('q19.txt', 'utf8')
    .split('\n\n')

let rules = {}

nums.split('\n').forEach(rule => {
    let [rule_num, right] = rule.split(": ")
    rules[+rule_num] = right
})

function resolve(index, depth) {
    if(depth > 500)
        return ""
    let rule = rules[index]
    if(rule.startsWith('"'))
        return rule.replace(/\"/g, '')
    else {
        let ors = rule.split(" | ")
        let resolves = []
        for(let or of ors) {
            let matches = []
            for(let a of or.split(" ")) {
                let r = resolve(+a, depth + 1)
                matches.push(r)
            }
            resolves.push(matches.join(''))
        }
        let group = resolves.join('|')
        return `(${group})`
    }
}

let re = RegExp(`^${resolve(0, 0)}$`)
console.log('p1', letters.split('\n').map(c => re.test(c)).filter(c => c).length)
rules[8] = '42 | 42 8'
rules[11] = '42 31 | 42 11 31'

re = `^${resolve(0, 0)}$`.length
console.log(re)
//console.log('p2', letters.split('\n').map(c => re.test(c)).filter(c => c).length)