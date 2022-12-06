import _ from 'lodash'

type Position = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
type Die = 1 | 2 | 3
type DieSum = 3 | 4 | 5 | 6 | 7 | 8 | 9;

interface Player {
    score: number;
    pos: Position;
}


interface Game {
    player1: Player;
    player2: Player;

    turn: 1 | 2;

    dice: DieSum

    num_universes: number;
}

const wrap = (n: number): Position => ((n - 1) % 10 + 1) as Position

const queue: Game[] = []

const probabilities: [num_universes: number, sum: DieSum][] = [
    [1, 3],
    [3, 4],
    [6, 5],
    [7, 6],
    [6, 7],
    [3, 8],
    [1, 9]
]

// Add a new game to the queue
for (let [num_universes, dice] of probabilities) {
    queue.push({
        player1: {
            score: 0,
            pos: 4
        },
        player2: {
            score: 0,
            pos: 8
        },
        turn: 1,
        dice,
        num_universes
    })
}

let p1_wins = 0
let p2_wins = 0

const soft_hash_game = (game: Game) => {
    return `${game.player1.pos}-${game.player1.score}-${game.player2.pos}-${game.player2.score}-${game.dice}-${game.turn}`
}

const hard_hash_game = (game: Game) => {
    return `${game.player1.pos}-${game.player1.score}-${game.player2.pos}-${game.player2.score}-${game.dice}-${game.turn}-${game.num_universes}`
}

const play_game = _.memoize((game: Game): [p1wins: boolean, p2wins: boolean] => {
    if (game.turn === 1) {
        game.player1.score += game.dice
        game.player1.pos = wrap(game.player1.pos + game.dice)
    } else {
        game.player2.score += game.dice
        game.player2.pos = wrap(game.player2.pos + game.dice)
    }

    if (game.player1.score >= 21)
        return [true, false]

    if (game.player2.score >= 21)
        return [false, true]

    return [false, false]
}, soft_hash_game)

const play_games = _.memoize((game: Game): [p1wins: number, p2wins: number, next: Game[]] => {

    // Play the game
    const result = play_game(game)

    if (result[0]) {
        return [game.num_universes, 0, []]
    } else if (result[1]) {
        return [0, game.num_universes, []]
    }

    let totals = [0, 0]
    let next_games: Game[] = []
    // If the game is **not** over, let's calculate the next game(s).
    for (const [multiplier, dice] of probabilities) {
        const next_game = {
            player1: {
                score: game.player1.score,
                pos: game.player1.pos
            },
            player2: {
                score: game.player2.score,
                pos: game.player2.pos
            },
            turn: game.turn === 1 ? 2 : 1 as 1 | 2,
            dice,
            num_universes: game.num_universes * multiplier
        }

        const result = play_game(next_game)

        if (result[0])
            totals[0] += next_game.num_universes
        else if (result[1])
            totals[1] += next_game.num_universes
        else {
            if (play_games.cache.has(hard_hash_game(next_game))) {
                // Just add to totals instead.
                const cache = play_games.cache.get(hard_hash_game(next_game))
                totals[0] += cache[0]
                totals[1] += cache[1]
            } else next_games.push(next_game)
        }
    }

    return [totals[0], totals[1], next_games]
}, hard_hash_game)

let i = 0
while (queue.length) {
    const game = queue.shift()!
    if (++i % 1000 === 0)
        console.log(i, queue.length, p1_wins, p2_wins)

    const [p1, p2, next] = play_games(game)

    p1_wins += p1
    p2_wins += p2

    queue.push(...next)
}

console.log(p1_wins, p2_wins)