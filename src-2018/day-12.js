const _ = require("lodash")

const raw = `...## => #
###.. => .
#.#.# => .
##### => .
....# => .
##.## => .
##.#. => #
##... => #
#..#. => #
#.#.. => .
#.##. => .
..... => .
##..# => .
#..## => .
.##.# => #
..### => #
..#.# => #
.#### => #
.##.. => .
.#..# => #
..##. => .
#.... => .
#...# => .
.###. => .
..#.. => .
####. => #
.#.## => .
###.# => .
#.### => #
.#... => #
.#.#. => .
...#. => .
`.split("\n").map(c => c.split(" => "))

let map = {}
for(let i of raw)
    map[i[0]] = i[1]

let init = "######....##.###.#..#####...#.#.....#..#.#.##......###.#..##..#..##..#.##..#####.#.......#.....##..".split("")

let pots = {}

const get = i => pots[i] || "."
const set = (i, j) => pots[i] = j
const surr = i => {
    let m = ""
    for(let j=-2;j<=2;j++)
        m += get(i+j)
    return m
}

const range = () => {
    let keys = Object.keys(pots).map(c=>+c)
    return [_.min(keys)-6, _.max(keys)+6]
}

for(let i in init) set(i, init[i])

const tick = () => {
    let n = {}

    let r = range()
    //console.log(init.length, r)
    for(let i=r[0]; i<=r[1]; i++)
        n[i] = map[surr(i)]
    
    pots = n
}

let p = 0

for(let i=0;i<50000000000;i++) {
    //console.log(pots)
    tick()

    let m = 0
    let o = 0
    let r = range()
    for(let i = r[0];i<r[1];i++) {
        m += get(i) == "#" ? i : 0
        o += +(get(i) == "#")
    }

    console.log(m, o, m - p, i)

    if(o === 73 && (m-p) < 74) {
        break
    }
    p = m
}
