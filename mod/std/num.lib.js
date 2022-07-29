// deno-lint-ignore no-unused-vars
function main() {
    return {
        meta: {
            help: 'This is a temporary module based on the numeric type',
        },
        require: ['num*'],
        execute: args => {
            log(args)
        },
    }
}