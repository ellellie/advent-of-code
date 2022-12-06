const util = require('../util')
const _ = require('lodash')

let input = util.get_input(5).split('\n')

const is_nice = (str) => {
    const vowels = ['a', 'e', 'i', 'o', 'u']
    const bad_strings = ['ab', 'cd', 'pq', 'xy']
    const has_double = /(\w)\1/.test(str)

    const has_vowels = _.filter(str, (c) => vowels.includes(c)).length >= 3
    const has_bad_strings = _.some(bad_strings, (b) => str.includes(b))

    return has_vowels && has_double && !has_bad_strings
}

console.log('Part 1', input.filter(is_nice).length)

const is_extra_nice = (str) => {
    const has_repeats = /(\w{2}).*\1/.test(str)
    const has_doubles = /(\w).\1/.test(str)

    return has_repeats && has_doubles
}

console.log('Part 2', input.filter(is_extra_nice).length)
