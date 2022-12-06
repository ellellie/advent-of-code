const fs = require('fs')
const input = fs.readFileSync('q2.txt', 'utf8')
    .split('\n')
    .map(c => {
        let [left, password] = c.split(": ")
        let [range, char] = left.split(" ");
        let [lower, upper] = range.split('-').map(c => +c)

        return { password, char, lower, upper }
    })

let p1valid = 0;
let p2valid = 0;

for(const {password, char, lower, upper} of input) {
    occurences = password.split(char).length - 1;
    if(occurences >= lower && occurences <= upper)
        p1valid++
    
    if(password[lower])
    if(password[lower - 1] == char || password[upper - 1] == char)
        if(password[lower - 1] != password[upper - 1])
            p2valid++

}

console.log("p1", p1valid)
console.log("p2", p2valid)