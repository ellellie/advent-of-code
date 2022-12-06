const fs = require("fs");
const _ = require("lodash")

const input = (day) =>
    fs.readFileSync("inputs/" + day, "utf8");

class Grid {
    constructor(width, def) {
        this.width = width
        this.grid = []

        this.default = def || -1
    }

    get(x, y) {
        const val = this.grid[+x + y * this.width]

        return this.grid[+x + y * this.width] === undefined ? this.default : val
    }

    set(v, x, y) {
        return this.grid[+x + y * this.width] = v
    }
}

class Fabric {
    constructor(def) {
        this.default = def || -1

        this.fabric = {}
    }

    get(...p) {
        const val = this.fabric[p.join(',')]
        return val === undefined ? this.default : val
    }

    set(v, ...p) {
        return this.fabric[p.join(',')] = v
    }
}

class LinkedList {
    constructor() {
        this.head = null
        this.tail = null
    }

    makeNode(value) {
        return {
            value,
            next: null,
        }
    }

    append(value) {
        const node = this.makeNode(value)
        if(!this.head)
            this.head = this.tail = node
        else {
            this.tail.next = node
            this.tail = node
        }
    }

    shift() {
        const node = this.head;
        if(this.head === null) return null;
        this.head = this.head.next;
        this.tail = this.tail.next;
    }

    pop() {
        throw new Error("not yet implemented - singly-linked list!")
    }

    replaceHead(newHead) {
        this.head = newHead
    }

    replaceTail(newTail) {
        this.tail = newTail
    }

    forEach(callback) {
        let node = this.head
        do {
            callback(node)
            node = this.head.next
        } while(node)
    }

    filter(rule, callback) {
        let node = this.head
        do {
            if(rule(node.value))
                callback(node)
            node = this.head.next
        } while(node)
    }
}

class Map extends Grid {
    constructor(input, def, entities) {
        let rows      = input.split("\n")
        super(rows[0].length, def)
        this.entities = []

        for(let y in rows)
        for(let x in rows[y])
            if(entities.indexOf(rows[y][x]) === -1)
                this.set(rows[y][x], x, y)
            else {
                this.set(this.default, x, y)
                this.entities.push({
                    x, y,
                    char: rows[y][x]
                })
            }
    }

    sortEntities() {
        let entities = []
        let rows = _.groupBy(this.entities, 'y')
        for(let y in rows)
            entities.push(..._.sortBy(rows[y], 'x'))
        
        return entities
    }
}

module.exports = {
    input,
    Fabric,
    Grid,
    Map,
    LinkedList
}