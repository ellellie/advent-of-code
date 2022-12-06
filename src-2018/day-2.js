const _     = require("lodash")
const util  = require("./util")

let input = util.input(2)

input = input.split("\n") // split by newline
//.map(s => +s) // to number
let a = [0,0]

for(let line in input) {
    str = input[line]
    
    let counts = _(str.split(""))
        .countBy(x=>x).value()
    _.uniq(Object.values(counts))
        .forEach(x => {
            if(x>1)
                a[x-2]++
        })
    
}
const getDiff = (string, diffBy) => string.split(diffBy).join('')

// from goog
editDistance = function(a, b) {
    var v0 = [];
    var v1 = [];
  
    if (a == b) {
      return 0;
    }
  
    if (!a.length || !b.length) {
      return Math.max(a.length, b.length);
    }
  
    for (var i = 0; i < b.length + 1; i++) {
      v0[i] = i;
    }
  
    for (var i = 0; i < a.length; i++) {
      v1[0] = i + 1;
  
      for (var j = 0; j < b.length; j++) {
        var cost = Number(a[i] != b[j]);
        // Cost for the substring is the minimum of adding one character, removing
        // one character, or a swap.
        v1[j + 1] = Math.min(v1[j] + 1, v0[j + 1] + 1, v0[j] + cost);
      }
  
      for (var j = 0; j < v0.length; j++) {
        v0[j] = v1[j];
      }
    }
  
    return v1[b.length];
  };
input.forEach(inp => {
    input.forEach(inpp => {
        //console.log(inp, inpp)
        diff = editDistance(inp, inpp)
        if(diff == 1)
            console.log(inp, inpp)
    })
})