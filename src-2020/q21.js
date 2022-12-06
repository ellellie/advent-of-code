const fs = require('fs')
let ingreds = {}
let allers  = []

const intersect = (a, b) => new Set([...a].filter(c => b.has(c)))

fs.readFileSync('q21.txt', 'utf8').split('\n').forEach(line => {
    let [ingred, aller] = line.split(' (contains ')
    if(aller) {
        ingred = ingred.split(" ")
        aller = aller.slice(0,aller.length-1).split(", ")

        for(let i of ingred) {
            ingreds[i] = ingreds[i] || 0
            ingreds[i]++
        }
        
        for (let i of aller)
            if(allers[i])
                allers[i] = intersect(allers[i], new Set(ingred))
            else
                allers[i] = new Set(ingred)
    } else {
        for(let i in ingred.split(" "))
            ingreds[i]++
    }
})

let all_allers = new Set()
for(let aller in allers)
    for(let item of allers[aller])
        all_allers.add(item)

let all_ingreds = new Set(Object.keys(ingreds))
let safe_ingreds = new Set([...all_ingreds])
for(let i of intersect(all_allers, all_ingreds))
    safe_ingreds.delete(i)

let x = [...safe_ingreds].map(ingred => ingreds[ingred]).reduce((a,b) => a+b)
console.log('p1', x)

while(Math.max(...Object.values(allers).map(c => c.size)) > 1) {
    for(let aller_name in allers) {
        if(allers[aller_name].size === 1) {
            for(let other in allers)
                if(aller_name != other)
                    for(let a of allers[aller_name])
                        allers[other].delete(a)
        }
    }
}

console.log('p2', Object.keys(allers).sort().map(c => [...allers[c]][0]).join(','))