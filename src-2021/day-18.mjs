import { getInput } from "./util.mjs"
import _ from "lodash"

const input = getInput(18).split("\n").map(JSON.parse)

const add_snailfish = (x, y) => [x, y]

const log = (...args) =>
    console.log(...args.map((c) => JSON.stringify(c, null, 2)))

const total_snailfish = input.reduce(add_snailfish)

const make_tree = (root, parent = undefined, depth = 0) => {
    if (Array.isArray(root)) {
        return {
            left: make_tree(root[0], root, depth + 1),
            right: make_tree(root[1], root, depth + 1),
            depth,
            parent,
        }
    }

    return {
        value: root,
        parent,
        depth,
    }
}

// Pretty-print the tree in ASCII
const print_tree = (tree, dir) => {
    if (tree.left) print_tree(tree.left, "left")

    console.log(
        " ".repeat(tree.depth) +
            (dir === "left" ? "/ " : "\\ ") +
            (tree.value || ".")
    )

    if (tree.right) print_tree(tree.right, "right")
}

// Traverse the tree
function* traverse_tree(tree) {
    const { left, right } = tree

    if (left) yield* traverse_tree(left)
    yield tree
    if (right) yield* traverse_tree(right)
}

function reduce(tree) {
    for (const node of traverse_tree(tree)) {
        if (node.depth === 0) {
            node.value = 0
        }
    }
}

const tree = make_tree(total_snailfish)
console.log(print_tree(tree))
