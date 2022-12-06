import { getInput } from "./util.mjs"
import _ from "lodash"

// Parsing input
const map = {
    0: "0000",
    1: "0001",
    2: "0010",
    3: "0011",
    4: "0100",
    5: "0101",
    6: "0110",
    7: "0111",
    8: "1000",
    9: "1001",
    A: "1010",
    B: "1011",
    C: "1100",
    D: "1101",
    E: "1110",
    F: "1111",
}

const input = getInput(16)

// map input to binary
const binary = [...input].flatMap((char) => [...map[char]].map(Number))

// Utility functions for reading packets

function read(arr, length) {
    const packet = arr.splice(0, length)

    if (packet.length !== length) {
        throw new Error("Ran out of bits")
    }

    return packet
}

// Part 1 - Find the sum of all packet versions
let total = 0
function readVersion(arr) {
    const version = parseInt(read(arr, 3).join(""), 2)
    total += version

    return version
}

function readType(arr) {
    return parseInt(read(arr, 3).join(""), 2)
}

function readNumber(arr) {
    let number = ""

    let final = read(arr, 1)[0] === 0
    let finalChunk

    while (true) {
        number += read(arr, 4).join("")

        if (final) break
        final = read(arr, 1)[0] === 0
    }

    // Convert number to decimal
    return parseInt(number + finalChunk, 2)
}

function readOperator(arr) {
    const type = read(arr, 1)[0]

    if (type === 0) {
        // Operator type 0
        const length = parseInt(read(arr, 15).join(""), 2)

        console.log(`The next ${length} bits are sub-packets`)

        const subPacketArr = read(arr, length)

        let packets = []
        while (subPacketArr.length) packets.push(readPacket(subPacketArr))

        return packets
    } else {
        // Operator type 1
        const length = parseInt(read(arr, 11).join(""), 2)
        console.log(`There are ${length} sub-packets`)

        let packets = []
        for (let i = 0; i < length; i++) packets.push(readPacket(arr))

        return packets
    }
}

function readPacket(arr) {
    // Read the first three bits (version)
    const version = readVersion(arr)

    // Read the next three bits (type)
    const type = readType(arr)

    console.log(`Reading packet with version ${version} and type ${type}`)

    switch (type) {
        case 0: // sum
            return readOperator(arr).reduce((a, b) => a + b)
        case 1: // product
            return readOperator(arr).reduce((a, b) => a * b)
        case 2: // minimum
            return _.min(readOperator(arr))
        case 3: // maximum
            return _.max(readOperator(arr))
        case 4: // Literal value
            return readNumber(arr)
        case 5: // greater than
            const [firstGT, secondGT] = readOperator(arr)
            return firstGT > secondGT ? 1 : 0
        case 6: // less than
            const [firstLT, secondLT] = readOperator(arr)
            return firstLT < secondLT ? 1 : 0
        case 7: // equal to
            const [firstET, secondET] = readOperator(arr)
            return firstET === secondET ? 1 : 0

        default:
            throw new Error("Unknown packet type")
    }
}

const result = readPacket(binary)
console.log("Part 1", total)
console.log("Part 2", result)
