import { getInput } from "./util"

type BingoCard = [
    [number, number, number, number, number],
    [number, number, number, number, number],
    [number, number, number, number, number],
    [number, number, number, number, number],
    [number, number, number, number, number]
]

function has_won(board: BingoCard, numbers: number[]) {
    const winning_row = board.some(
        row => row.every(num => numbers.includes(num))
    )

    const winning_col = board.some(
        (row, i) => row.every(num => numbers.includes(board[0][i]))
    )

    console.log(
        { winning_col, winning_row }
    )

    console.log(board, numbers)

    return winning_row || winning_col
}

function load_input() {
    const [numbers, ...boards] = getInput(4).split('\n\n')

    return {
        numbers: numbers.split(',').map(Number),
        boards: boards.map(
            board => board.split('\n').map(
                row => row.split(/\s+/).map(Number)
            )
        ) as BingoCard[]
    }
}

// Part 1
{
    const { numbers, boards } = load_input()

    outer: for (let i = 0; i < numbers.length; i++) {
        const chosen_numbers = numbers.slice(0, i)

        for (const board of boards) {
            if (has_won(board, chosen_numbers)) {
                const unmarked_sum = board
                    .flat()
                    .filter(num => !chosen_numbers.includes(num))
                    .reduce((a, b) => a + b, 0)

                console.log(chosen_numbers)
                console.log("Part 1", unmarked_sum * chosen_numbers[chosen_numbers.length - 1])

                break outer
            }
        }
    }
}