// deno-lint-ignore no-unused-vars
function main() {
    return {
        meta: {
            help: 'This is a temporary module based on the string type',
        },
        require: ['str*'],
        execute: args => {
            log(args)
        },
    }
}