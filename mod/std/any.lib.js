// deno-lint-ignore no-unused-vars
function main() {
    return {
        meta: {
            help: 'This is a temporary module based on the any type',
        },
        require: ['any*'],
        execute: args => {
            log(args)
        },
    }
}