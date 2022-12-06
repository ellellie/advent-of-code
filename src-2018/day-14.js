let input = 170641
let s = "170641".split("").map(c => +c)

let scores = [3, 7]

let elves  = [0, 1]

const equals = (a,b) => {
    for(i in a) if(a[i] !== b[i])
        return false
    return true
}

let found = false
let roll = Array(s.length).fill("-")
const tick = () => {
    let sum = `${scores[elves[0]] + scores[elves[1]]}`.split("").map(c => +c)
    for(let i of sum) {
        roll.shift()
        roll.push(i)
        //console.log(roll.join(""), s.join(""))
        if(equals(s, roll) && !found) {
            found = true
            console.log(roll, s, scores)
            console.log(scores.length - s.length + 1)
        }
        
        scores.push(i)
    }

    for(let i in elves) {
        elves[i] += scores[elves[i]] + 1
        elves[i] %= scores.length
    }
}

while(roll.join("") !== s) {
    tick()
    if(scores.length === input + 10) {
        let a = ""
        for(let j=0; j < 10; j++)
            a += scores[input + j]
        console.log(a)
    }
}