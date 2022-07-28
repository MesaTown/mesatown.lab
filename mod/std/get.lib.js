// deno-lint-ignore no-unused-vars
function main() {
    return {
        require: ['str'],
        execute: args => {
            if (localStorage.getItem(args[0])) {
                log(`value:${localStorage.getItem(args[0])} at key:${args[0]}`)
            } else {
                log(`key:${args[0]} does not exist in memory`)
            }
        },
    }
}