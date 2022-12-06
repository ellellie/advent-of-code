const util = require("./util")
const _ = require("lodash")

const nums = [
    85, 84, 30, 15, 46, 71, 64, 45, 13, 90, 63, 89, 62, 25, 87, 68, 73, 47, 65,
    78, 2, 27, 67, 95, 88, 99, 96, 17, 42, 31, 91, 98, 57, 28, 38, 93, 43, 0,
    55, 49, 22, 24, 82, 54, 59, 52, 3, 26, 9, 32, 4, 48, 39, 50, 80, 21, 5, 1,
    23, 10, 58, 34, 12, 35, 74, 8, 6, 79, 40, 76, 86, 69, 81, 61, 14, 92, 97,
    19, 7, 51, 33, 11, 77, 75, 20, 70, 29, 36, 60, 18, 56, 37, 72, 41, 94, 44,
    83, 66, 16, 53,
]

const input = util
    .getInput(4)
    .split("\n\n")
    .map((board) =>
        board.split("\n").map((row) => row.trim().split(/\s+/).map(Number))
    )

// console.log(input)

const isWinner = (board2, nums) => {
    const board = _.cloneDeep(board2)

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (nums.includes(board[i][j])) board[i][j] = -1
        }
        // Is this row a match?
        if (board[i].every((num) => num === -1)) {
            return true
        }
    }

    // foreach column
    for (let i = 0; i < board.length; i++)
        if (board.map((row) => row[i]).every((num) => num === -1)) {
            return true
        }

    return false
}

a: for (let i = 0; i < nums.length; i++) {
    const n = nums.slice(0, i) // nums[:i]

    for (let i in input) {
        const board = input[i]

        if (board === null) continue

        if (isWinner(board, n)) {
            const newNums = [
                ...board[0],
                ...board[1],
                ...board[2],
                ...board[3],
                ...board[4],
            ].filter((num) => !n.includes(num))

            const numsum = newNums.reduce((a, b) => a + b)
            console.log("Part 1", numsum * n[n.length - 1])

            // break a
            input[i] = null
        }
    }
}

// let last = null
// for (let i = 0; i < nums.length; i++) {
//     const n = nums.slice(0, i)

//     for (let i in input) {
//         const board = input[i]
//         if (board === null) continue

//         if (isWinner(board, n)) {
//             const newNums = [
//                 ...board[0],
//                 ...board[1],
//                 ...board[2],
//                 ...board[3],
//                 ...board[4],
//             ].filter((num) => !n.includes(num))

//             const numsum = newNums.reduce((a, b) => a + b)
//             last = numsum * n[n.length - 1]
//             input[i] = null
//         }
//     }
// }

// console.log("Part 2", last)
