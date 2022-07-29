// deno-lint-ignore no-unused-vars
function main() {
    return {
        meta: {
            help: 'This is a temporary module based on the boolean type',
        },
        require: ['bool*'],
        execute: args => {
            log(args)
        },
    }
}