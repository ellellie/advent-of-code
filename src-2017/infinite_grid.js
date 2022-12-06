const set =
    (data, { num_dimensions }) =>
    (value, ...coordinates) => {
        if (coordinates.length !== num_dimensions) {
            throw new Error(
                `Expected ${num_dimensions} coordinates, got ${coordinates.length}`
            )
        }

        const key = coordinates.join(',')

        data[key] = value
    }

const get =
    (data, { num_dimensions, default_value }) =>
    (...coordinates) => {
        if (coordinates.length !== num_dimensions) {
            throw new Error(
                `Expected ${num_dimensions} coordinates, got ${coordinates.length}`
            )
        }

        const key = coordinates.join(',')

        return data[key] || default_value
    }

const filter = (data, options) => (predicate) => {
    const result = {}

    for (const key in data) {
        const value = data[key]

        if (predicate(value, ...key.split(',').map(Number))) {
            result[key] = value
        }
    }

    return from_data(data, options)
}

const sum =
    (data, options) =>
    (predicate = (value, ...pos) => value) => {
        if (
            !!options.default_value &&
            typeof options.default_value === 'number' &&
            !options.sum_ignore_unvisited
        ) {
            throw new Error('Cannot sum infinite grid with default value')
        }

        let sum = 0

        for (const key in data) {
            sum += predicate(data[key], ...key.split(',').map(Number))
        }

        return sum
    }

const infinite_grid = (
    options = {
        num_dimensions: 2,
        default_value: undefined,
        sum_ignore_unvisited: false,
    }
) => {
    const data = {}

    options.num_dimensions =
        options.num_dimensions === undefined ? 2 : options.num_dimensions
    options.default_value =
        options.default_value === undefined ? 0 : options.default_value
    options.sum_ignore_unvisited =
        options.sum_ignore_unvisited === undefined
            ? false
            : options.sum_ignore_unvisited

    return {
        get: get(data, options),
        set: set(data, options),
        filter: filter(data, options),
        sum: sum(data, options),
    }
}

const from_data = (data, options) => ({
    get: get(data, options),
    set: set(data, options),
    filter: filter(data, options),
    sum: sum(data, options),
})

module.exports = { infinite_grid }
