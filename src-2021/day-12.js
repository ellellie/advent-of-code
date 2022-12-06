const { getInput } = require("./util")
const _ = require("lodash")

const graph = {}

let edges = getInput(12)
    .split("\n")
    .forEach((line) => {
        const [from, to] = line.split("-")
        graph[from] = graph[from] || []
        graph[from].push(to)

        graph[to] = graph[to] || []
        graph[to].push(from)
    })

function is_small(cave) {
    return cave.toLowerCase() == cave
}

const dfs = (graph, path = ["start"]) => {
    let total_paths = 0

    for (const adjacent of graph[path[path.length - 1]]) {
        if (adjacent === "start") continue
        else if (adjacent === "end") total_paths++
        else if (!path.includes(adjacent) || !is_small(adjacent))
            total_paths += dfs(graph, [...path, adjacent])
    }

    return total_paths
}

const dfs_set = (graph, curr = "start", path = new Set(["start"])) => {
    let total_paths = 0

    for (const adjacent of graph[curr]) {
        if (adjacent === "start") continue
        else if (adjacent === "end") total_paths++
        else if (!path.has(adjacent) || !is_small(adjacent)) {
            path.add(adjacent)
            total_paths += dfs_set(graph, adjacent, path)
            path.delete(adjacent)
        }
    }

    return total_paths
}

const dfs_set2 = (graph, current, visited = new Set([current])) => {
    // at the end
    if (current === "end") return 1

    // visited.add(current)
    let total_paths = 0

    for (const adjacent of graph[current]) {
        if (is_small(adjacent) && visited.has(adjacent)) continue
        visited.add(adjacent)
        total_paths += dfs_set2(graph, adjacent, visited)
        visited.delete(adjacent)
    }

    // visited.delete(current)

    return total_paths
}

console.log(dfs_set2(graph, "start"))
