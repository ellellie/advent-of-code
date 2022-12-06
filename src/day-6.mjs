    import { getInput } from './util.mjs';

    const input = [...getInput(6)]

    for(let i = 0; i < input.length; i++) {
        let x = new Set(input.slice(i, i+4))

        if(x.size  === 4) {
            console.log(i+4)
            break
        }
    }

    for(let i = 0; i < input.length; i++) {
        let x = new Set(input.slice(i, i+14))

        if(x.size  === 14) {
            console.log(i+14)
            break
        }
    }