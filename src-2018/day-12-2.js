const initial_state = "######....##.###.#..#####...#.#.....#..#.#.##......###.#..##..#..##..#.##..#####.#.......#.....##.."
const rules = `##### => .
####. => #
###.# => .
###.. => .
##.## => .
##.#. => #
##..# => .
##... => #
#.### => #
#.##. => .
#.#.# => .
#.#.. => .
#..## => .
#..#. => #
#...# => .
#.... => .
.#### => #
.###. => .
.##.# => #
.##.. => .
.#.## => .
.#.#. => .
.#..# => #
.#... => #
..### => #
..##. => .
..#.# => #
..#.. => .
...## => #
...#. => .
....# => .
..... => .`.split("\n")

const convn = st => {
    let i = 0
    st = st.split("").reverse()
    for(let j in st)
        i += +(st[j] == "#") * (2**j)
    
    return i
}

let map = []
for(let rule of rules) {
    let [from, to] = rule.split(" => ")
    //console.log(from, to)
    map[convn(from)] = to == "#"
}

let pots = []

const get = i      => pots[i] || false
const set = (i, j) => pots[i] = j

for(let i in initial_state)
    set(i, initial_state[i] == "#")

const range = () => {
    let keys = Object.keys(pots)

    let [min, max] = [0, 0]
    
    for(let o of keys) {
        if(min > o) min = o
        if(max < o) max = o
    }

    return [+min-10, +max+10]
}

let roll = 0 // .....

const tick = () => {
    let r = range()
    let n = []

    for(let i = r[0]; i<r[1]; i++) {
        // shift reg.
        roll = (roll << 1) % 32 + get(i)
        n[i-2] = map[roll]
    }

    pots = n
}

for(let i=0;i<20;i++)
    tick()
let s = 0

for(let i in pots) if(pots[i]) s += +i
console.log(s)