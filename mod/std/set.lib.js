// deno-lint-ignore no-unused-vars
function main() {
    return {
        require: ['str', 'any'],
        execute: args => {
            if (typeof args[1] === 'undefined') {
                return log(`No value specified`)
            }
            if (localStorage.getItem(args[0])) {
                localStorage.setItem(args[0], args[1]) 
                log(`Overwrite value:${args[1]} to key:${args[0]} in memory`)
            } else {
                localStorage.setItem(args[0], args[1]) 
                log(`Stored value:${args[1]} to key:${args[0]} in memory`)
            }
        },
    }
}