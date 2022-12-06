const _ = require("lodash")
const input = 8868

const power = (x, y) => Math.floor((((x+10)*y+input)*(x+10))%1000 / 100 - 5)

let grid = []
let gridsum = []

const get = (x,y)   => grid[(x-1) + (y-1) * 300]
const set = (x,y,v) => grid[(x-1) + (y-1) * 300] = v

const find = () => {

    let bestCoord = '';
    let bestSum = 0;

    for (let y = 1; y < 301; y += 1) {
        for (let x = 1; x < 301; x += 1) {
            const maxSize = Math.min(301 - x, 301 - y);
            let powerSum = 0;
            for (let s = 0; s < maxSize; s += 1) {
                for (let dx = 0; dx < s; dx += 1)
                for (let dy = 0; dy < s; dy += 1)
                    powerSum += power(input, x + dx, y + dy);
                
                powerSum += power(input, x + s, y + s);
                if (powerSum > bestSum) {
                    bestSum = powerSum;
                    bestCoord = x + ',' + y + ',' + (s + 1);
                }
            }
        }
        console.log(y, (301-y)**2 * 300);
    }

    return bestCoord;
};

console.log(find())