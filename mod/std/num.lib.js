// deno-lint-ignore no-unused-vars
function main() {
    return {
        require: ['num*'],
        execute: args => {
            log(args)
        },
    }
}