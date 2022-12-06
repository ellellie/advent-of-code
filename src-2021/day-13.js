const util = require("./util")
const _ = require("lodash")

// Parse input

let [points, folds] = util.getInput(13).split("\n\n")

points = points.split("\n").map((point) => {
    const [x, y] = point.split(",").map(Number)
    return { x, y }
})

const FOLD_REGEX = /fold along (?<axis>[xy])=(?<amount>\d+)/

folds = folds.split("\n").map((fold) => {
    const {
        groups: { axis, amount },
    } = FOLD_REGEX.exec(fold)

    return { axis, amount: +amount }
})

function print_points(points) {
    // Pretty-print points as a grid..
    const min_x = _.minBy(points, "x").x
    const max_x = _.maxBy(points, "x").x
    const min_y = _.minBy(points, "y").y
    const max_y = _.maxBy(points, "y").y

    const grid = []

    for (let y = min_y; y <= max_y; y++) {
        grid[y] = []
        for (let x = min_x; x <= max_x; x++) {
            grid[y][x] = " "
        }
    }

    points.forEach((point) => {
        grid[point.y][point.x] = "█"
    })

    console.log(grid.map((row) => row.join("")).join("\n"))
}

// Part 1

function fold_horizontally(points, pivot) {
    const left = points.filter((point) => point.x < pivot)
    const right = points
        .filter((point) => point.x > pivot)
        .map(({ x, y }) => ({
            x: pivot - (x - pivot),
            y,
        }))

    // overlap left and right
    return _.unionWith(left, right, _.isEqual)
}

function fold_vertically(points, pivot) {
    const top = points.filter((point) => point.y < pivot)

    const bottom = points
        .filter((point) => point.y > pivot)
        .map(({ x, y }) => ({
            x,
            y: pivot - (y - pivot),
        }))

    // overlap top and bottom
    return _.unionWith(top, bottom, _.isEqual)
}

function fold(points, axis, amount) {
    return axis === "x"
        ? fold_horizontally(points, amount)
        : fold_vertically(points, amount)
}

console.log("Part 1", fold(points, folds[0].axis, folds[0].amount).length)

// Part 2

// Complete all the folds
for (const { axis, amount } of folds) points = fold(points, axis, amount)

print_points(points)
