// deno-lint-ignore no-unused-vars
function main() {
    return {
        require: ['str'],
        execute: args => {
            if (localStorage.getItem(args[0])) {
                localStorage.removeItem(args[0])
                log(`Removed key:${args[0]} from memory`)
            } else {
                log(`key:${args[0]} does not exist in memory`)
            }
        },
    }
}