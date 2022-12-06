import _ from "lodash"

const target = {
    x: [257, 286],
    y: [-101, -57],
}

const move = (pos, vel) => {
    pos.x += vel.x
    pos.y += vel.y

    if (vel.x > 0) vel.x -= 1

    if (vel.x < 0) vel.x += 1

    vel.y -= 1

    return { pos, vel }
}

const inTarget = (pos) => {
    return (
        pos.x >= target.x[0] &&
        pos.x <= target.x[1] &&
        pos.y >= target.y[0] &&
        pos.y <= target.y[1]
    )
}

function* velocity() {
    for (let x = -100; x <= 100; x++)
        for (let y = -100; y <= 100; y++) yield { x, y }

    return { x: 0, y: 0 }
}
