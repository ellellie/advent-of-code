import { getInput } from "./util.mjs";
import _ from "lodash"
import * as R from "ramda"

const files = {}

const input = getInput(7)
    .split("$ ")
    .map(c => c.trim().split("\n"))

// console.log(input)

let path = []

for(const out of input) {

    if(out.length === 0) continue

    // console.log(out)
    const cmd = out[0].split(" ")

    // console.log(cmd)

    if(cmd[0] === "cd") {
        if(cmd[1] === "/") {
            path = []
        } else if(cmd[1] === "..")
            path.pop()
        else {
            path.push(cmd[1])
        }
        // console.log(path)
    } else if(cmd[0] === "ls") {
        let x = files
        for(const i of path) {
            x = x[i] ? x[i] : (x[i] = {})
        }

        out.shift()
        for(const i of out) {
            const entry = i.split(" ")
            if(entry[0] === "dir")
                x[entry[1]] = {}
            else {
                x[entry[1]] = +entry[0]
            }
        }
    }
    
}

let part1 = 0

const size = (dir) => {
    let total = 0

    for(const i in dir) {
        if(typeof dir[i] === "number")
            total += dir[i]
        else total += size(dir[i])
    }

    if(total <= 100000) {
        part1 += total
    }

    return total

}

const remaining = 30000000 - (70000000 - size(files))
console.log("part 1", part1)


let sizes = []

const size2 = (dir) => {
    let total = 0

    for(const i in dir) {
        if(typeof dir[i] === "number")
            total += dir[i]
        else total += size2(dir[i])
    }

    if(total >= remaining) {
        sizes.push(total)
    }
    

    return total

}

size2(files)

console.log("part 2", Math.min(...sizes))