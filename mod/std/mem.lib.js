// deno-lint-ignore no-unused-vars
function main() {
    return {
        require: [],
        execute: _args => {
            const items = Object.entries({ ...localStorage })
            let pureValue = items.length
            if (items.length > 0) {
                for (let i = 0; i < items.length; i++) {
                    const [key, value] = items[i]
                    if (/^\_{2}.+/.test(key)) pureValue -= 1
                    else log(`value:${value} at key:${key}`)
                }
            }
            if (pureValue <= 0) log(`There are no items stored in memory`)
        },
    }
}