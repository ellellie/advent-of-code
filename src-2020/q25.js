const [door_pub, card_pub] = [11562782, 18108497]

function transform(subject_number, loop_size) {
    let value = 1

    for(let i = 0; i < loop_size; i++) {
        value *= subject_number
        value %= 20201227
    }

    return value
}

function findPub(subject_number, pubkey) {
    let value = 1
    let loop_size = 0

    while(value !== pubkey) {
        value *= subject_number
        value %= 20201227
        loop_size++
    }

    return loop_size
}

let card_loop = findPub(7, card_pub)

console.log('p1', transform(door_pub, card_loop))
console.log('p2', 'n/a')