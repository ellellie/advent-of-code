const _ = require("lodash")
const util = require("./util")

const input = util.input(13).split("\n")

const grid  = new util.Grid(input[0].length, [])
const carts = []

const parts = {
    // Track parts
    "/": ["down", "right"],
    "\\": ["up", "left"],
    "+": ["up", "down", "left", "right"],
    "-": ["left", "right"],
    "|": ["up", "down"],

    // Carts
    "<": ["left", "right"],
    ">": ["right", "left"],
    "^": ["up", "down"],
    "v": ["down", "up"]
}

let id = 0
const cartTypes = "<>^v"

for(let i in input) {
    let row = input[i]
    for(let j in row) {
        grid.set(row[j], j, i)
        if(cartTypes.indexOf(row[j]) !== -1)
            carts.push({
                y: i,
                x: j,
                direction: parts[row[j]][0],
                id: id++
            })
    }
}

const getDirection = dir => {
    switch(dir) {
        case "up": return [0, -1]
        case "down": return [0, 1]
        case "left": return [-1, 0]
        case "right": return [1, 0]
        default: throw new Error(dir);
    }
}

const tick = () => {

    let sorted = _.groupBy(carts, 'y')

    for(let row in sorted) {
        for(let id of _.map(_.sortBy(sorted[row], 'x'), 'id')) {

            let ind = _.findIndex(carts, { id })
            let cart = carts[ind]
            // calculate movement of cart
            let dirs = parts[grid.get(cart.x, cart.y)]
            if(dirs.indexOf(cart.direction) == -1)
            let dir = dirs.length > 1 ? cart.direction : dirs[0]
            console.log(dir)
            let [dx, dy] = getDirection(dir)
            cart.direction = dir
            cart.x += dx
            cart.y += dy

            if(_.filter(carts, {
                x: cart.x,
                y: cart.y
            }).length > 1) console.log("a")

            carts[ind] = cart
        }
    }
}

for(let i = 0; i < 10000; i++) {
    console.log(i)
    tick()
}