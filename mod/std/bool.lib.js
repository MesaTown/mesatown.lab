// deno-lint-ignore no-unused-vars
function main() {
    return {
        require: ['bool*'],
        execute: args => {
            log(args)
        },
    }
}