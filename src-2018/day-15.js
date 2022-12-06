const util = require("./util")

const input = util.input(15)
const map   = new util.Map(input, ".", "EG".split(""))

map.sortEntities().forEach(a => a.hp = 200)

console.log(map.grid.length)