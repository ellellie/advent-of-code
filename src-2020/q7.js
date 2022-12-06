const fs = require('fs')

let bags = {}

const input = fs.readFileSync('q7.txt', 'utf8')
    .split('\n')
    // .split('\n\n')
    .forEach(c => {
        let [item,contents] = c.split(' bags contain ')
        innerItems = contents.split(', ').map(c => {
            let [innerItem, _] = c.split(" bag")
            let numItem = +(innerItem.split(' ')[0])
            let [__, ...name] = innerItem.split(' ')

            return {
                amount: numItem,
                type: name.join(' ')
            }
        })
        bags[item] = innerItems
    })

function containsBag(bag) {
    let contents = bags[bag]
    //console.log(contents)
    if(contents)
    for(const {amount, type} of contents) {
        if(type == 'shiny gold') {
            return true
        } else {
            if(containsBag(type))
                return true
        }
    }

    return false
}

function sumBags(bag, sum = 0) {
    let contents = bags[bag]
    if(contents) {
        for(const {amount, type} of contents) {
            if(type !== 'other') {
                sum += amount
                sum += sumBags(type) * amount
            }
        }
    }

    return sum
}

let total = 0
for(const bag in bags) {
    if(containsBag(bag))
        total++
}

console.log('p1', total)
console.log('p2', sumBags('shiny gold'))