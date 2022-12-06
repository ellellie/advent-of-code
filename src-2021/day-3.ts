import { getInput } from "./util";

const binaries = getInput(3).split('\n').map(
    row => row.split('').map(Number)
)

const most_common = (array: number[]) => {
    const zeroes = array.filter(x => x === 0).length
    const ones = array.length - zeroes

    return zeroes > ones ? 0 : 1
}

const least_common = (array: number[]) => most_common(array) === 0 ? 1 : 0

// Part 1
{
    const gamma = parseInt(
        binaries[0].map((_, i) =>
            most_common(
                binaries.map(row => row[i])
            )
        ).join(''),
        2
    )

    const epsilon = parseInt(
        binaries[0].map((_, i) =>
            least_common(
                binaries.map(row => row[i])
            )
        ).join(''),
        2
    )

    console.log("Part 1", gamma * epsilon)
}

// Part 2
{
    let oxygen_nums = binaries
    let carbon_nums = binaries

    for (let i = 0; i < binaries[0].length; i++) {
        const most_comm = most_common(oxygen_nums.map(row => row[i]))

        oxygen_nums = oxygen_nums.filter(row => row[i] === most_comm)

        // Unlike oxygen, we can't just remove the last number
        // since it might be the only one left
        if (carbon_nums.length > 1) {
            const least_comm = least_common(carbon_nums.map(row => row[i]))
            carbon_nums = carbon_nums.filter(row => row[i] === least_comm)
        }
    }

    const oxygen_rating = parseInt(oxygen_nums[0].join(''), 2)
    const carbon_rating = parseInt(carbon_nums[0].join(''), 2)

    console.log("Part 2", oxygen_rating * carbon_rating)
}